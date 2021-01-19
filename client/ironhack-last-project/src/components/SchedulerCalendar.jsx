import Scheduler, {
  SchedulerData,
  ViewTypes,
  DATE_FORMAT,
} from "react-big-scheduler";
import "react-big-scheduler/lib/css/style.css";
import moment from "moment";
import React, { Component } from "react";
import PropTypes from "prop-types";
import ApiHandler from "../api/apiHandler";
import _ from "lodash";
import "antd/lib/style/index.less";

let resources = [
  {
    id: "6005d63c30136b18d8dad71f",
    name: "Resource1",
  },
  {
    id: "r2",
    name: "Resource2",
  },
  {
    id: "r3",
    name: "Resource3",
  },
];

let events = [
  {
    id: 1,
    start: "2021-01-18 09:30:00",
    end: "2021-01-19 09:30:00",
    resourceId: "6005d63c30136b18d8dad71f",
    title: "I am finished",
    bgColor: "#D9D9D9",
  },
];

export default class SchedulerCalendar extends Component {
  schedulerData = undefined;

  constructor(props) {
    super(props);

    let schedulerData = new SchedulerData(
      new moment().format(DATE_FORMAT),
      ViewTypes.Week
    );
    schedulerData.setResources(resources);
    schedulerData.setEvents(events);
    schedulerData.localeMoment.locale("en");
    this.state = {
      viewModel: schedulerData,
    };
  }

  componentDidMount() {
    ApiHandler.get("/api/team")
      .then((apiResponse) => {
        console.log("coucou");
        const data_team = apiResponse.data;

        let schedulerData = new SchedulerData(
          new moment().format(DATE_FORMAT),
          ViewTypes.Week
        );

        schedulerData.setResources(data_team);
        schedulerData.setEvents(events);
        schedulerData.localeMoment.locale("fr");
        this.setState({
          viewModel: schedulerData,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(events);
    this.setState({
      viewModel: schedulerData,
    });
  };
  eventClicked = (schedulerData, event) => {
    alert(
      `You just clicked an event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops1 = (schedulerData, event) => {
    alert(
      `You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  ops2 = (schedulerData, event) => {
    alert(
      `You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`
    );
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({
      viewModel: schedulerData,
    });
  };
  render() {
    const { viewModel } = this.state;
    return (
      <div>
        <Scheduler
          schedulerData={viewModel}
          prevClick={this.prevClick}
          nextClick={this.nextClick}
          onSelectDate={this.onSelectDate}
          onViewChange={this.onViewChange}
          eventItemClick={this.eventClicked}
        />
      </div>
    );
  }
}
