import React from "react";
import NavSubScheduler from "../components/NavSubScheduler";
import SchedulerCalendar from "../components/SchedulerCalendar";
class Scheduler extends React.Component {
  render() {
    return (
      <div>
        <NavSubScheduler />
        <SchedulerCalendar />
      </div>
    );
  }
}

export default Scheduler;
