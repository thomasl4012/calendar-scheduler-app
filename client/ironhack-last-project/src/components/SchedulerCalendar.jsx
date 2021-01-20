import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { INITIAL_EVENTS, createEventId } from "./event-utils";
import ApiHandler from "../api/apiHandler";
import EditEvent from "../components/Dialogs/EditEvent";
export default class SchedulerCalendar extends React.Component {
  state = {
    weekendsVisible: true,
    currentEvents: [],
    resources: [],
  };

  componentDidMount() {
    Promise.all([
      ApiHandler.get("/api/team"),
      ApiHandler.get("/api/event"),
    ]).then(([responseTeam, responseEvent]) => {
      this.setState({
        currentEvents: responseEvent.data,
        resources: responseTeam.data,
      });
    });
  }

  handleUpdate(infos) {
    if (
      !window.confirm(
        `Do you want to move the event here : ${infos.event.start} and affect it to this team : ${infos.newResource._resource.title}`
      )
    ) {
      infos.revert();
      console.log(infos);
    } else {
      console.log(infos);
      ApiHandler.patch("/api/event/" + infos.event._def.publicId, {
        title: infos.event.title,
        start: infos.event.start,
        end: infos.event.end,
        resourceId: infos.newResource._resource.id,
        color: infos.newResource._resource.title,
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    console.log("resourcees ==>", this.state.resources);
    console.log("INITAL VIEWS ==>", INITIAL_EVENTS);
    console.log("STATE ==>", this.state.currentEvents);
    if (this.state.currentEvents[0]?.id) {
      console.log(
        this.state.currentEvents[0]?.resourceId === this.state.resources[1]?.id
      );
    }

    return (
      <div>
        {this.renderSidebar()}
        <div>
          {this.state.resources.length && (
            <FullCalendar
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                resourceTimelinePlugin,
              ]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right:
                  "resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
              }}
              customButtons={{
                text: "add a team",
              }}
              initialView="resourceTimeline"
              editable={true}
              nowIndicator={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              schedulerLicenseKey={"CC-Attribution-NonCommercial-NoDerivatives"}
              weekends={this.state.weekendsVisible}
              initialEvents={this.state.currentEvents}
              resources={this.state.resources} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={(infos) => {
                this.handleEventClick(infos);
              }}
              eventDrop={(infos) => {
                this.handleUpdate(infos);
              }}
              eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
            />
          )}
        </div>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section"></div>
        <div className="demo-app-sidebar-section">
          <label>
            <input
              type="checkbox"
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            toggle weekends
          </label>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>All Events ({this.state.currentEvents.length})</h2>
          <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEventClick = (infos) => {
    console.log(infos);
  };

  // handleEvents = (events) => {
  //   this.setState({
  //     currentEvents: events,
  //   });
  // };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}
