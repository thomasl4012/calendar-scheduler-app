import React from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

import ApiHandler from "../api/apiHandler";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

import FormEditEvents from "./Forms/FormEditEvents";

export default class SchedulerCalendar extends React.Component {
  state = {
    open: false,
    weekendsVisible: true,
    currentEvents: [],
    resources: [],
    event: [],
    eventId: "",
  };

  handleToggle = () => {
    this.setState({
      open: !this.state.open,
    });
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
    let dataResource = "";
    let dataColor = "";
    if (infos.newResource === null) {
      dataResource = infos.event._def.resourceIds[0];
      dataColor = infos.event.backgroundColor;
    } else {
      dataResource = infos.newResource._resource.id;
      dataColor = infos.newResource._resource.title;
    }

    if (
      !window.confirm(
        `Do you want to move the event here : ${infos.event.start.toISOString()} and affect it to this team : ${dataColor}`
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
        resourceId: dataResource,
        color: dataColor,
      })
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const color = event.currentTarget.getAttribute("data-set");
    this.setState({
      [name]: value,
      color,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    ApiHandler.patch("/api/event/" + this.state.eventId, {
      title: this.state.title,
      start: this.state.start,
      end: this.state.end,
      resourceId: this.state.resourceId,
      color: this.state.color,
    })
      .then(() => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDelete = () => {
    ApiHandler.delete("api/event/" + this.state.eventId)
      .then((apiResponse) => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleResize(info) {
    console.log(info);
    if (
      !window.confirm(
        `Do you want to resize ${
          info.event.title
        } starting from : ${info.event.start.toISOString()} and ending to : ${info.event.end.toISOString()}`
      )
    ) {
      info.revert();
      console.log(info);
    } else {
      console.log(info);
      ApiHandler.patch("/api/event/" + info.event._def.publicId, {
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        resourceId: info.event._def.resourceIds[0],
        color: info.event.backgroundColor,
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
    const { open } = this.state;
    console.log("resourcees ==>", this.state.resources);

    console.log("STATE ==>", this.state.currentEvents);
    if (this.state.currentEvents[0]?.id) {
      console.log(
        this.state.currentEvents[0]?.resourceId === this.state.resources[1]?.id
      );
    }

    return (
      <div>
        <div style={{ margin: "10px" }}>
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
              initialView="resourceTimeline"
              editable={true}
              resourceLabelText={"roro"}
              nowIndicator={true}
              height={"auto"}
              selectable={true}
              eventDurationEditable={true}
              eventResizableFromStart={true}
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
              eventResize={(info) => {
                this.handleResize(info);
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
        <div>{this.renderSidebar()}</div>
        <Dialog
          open={open}
          onClose={this.handleToggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Edit or delete this event
          </DialogTitle>
          <DialogContent>
            <FormEditEvents
              open={this.state.open}
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              handleDelete={this.handleDelete}
              title={open && this.state.event.event._def.title}
              start={
                open &&
                this.state.event.event._instance.range.start.toISOString()
              }
              end={
                open && this.state.event.event._instance.range.end.toISOString()
              }
              data_team={open && this.state.resources}
              defaultValue={
                open && this.state.event.event._def.ui.backgroundColor
              }
            />
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
      </div>
    );
  }

  renderSidebar() {
    return (
      <div className="demo-app-sidebar">
        <div className="demo-app-sidebar-section"></div>
        <div className="demo-app-sidebar-section"></div>
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
    console.log(selectInfo);
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      this.setState({
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        resourceId: selectInfo.resource._resource.id,
        color: selectInfo.resource._resource.title,
      });

      ApiHandler.post("/api/event/create", this.state)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleEventClick = (info) => {
    console.log(info);
    this.setState({ event: info, eventId: info.event._def.publicId });
    this.handleToggle();
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
