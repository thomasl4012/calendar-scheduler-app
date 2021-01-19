import React from "react";

import { Button } from "@material-ui/core";
import "../styles/NavMain.css";

const NavSubScheduler = (props) => {
  return (
    <nav className="NavMain">
      <ul className="nav-list-sub">
        <React.Fragment>
          <li>
            <Button variant="contained">Add an Event</Button>
          </li>
        </React.Fragment>
      </ul>
    </nav>
  );
};

export default NavSubScheduler;
