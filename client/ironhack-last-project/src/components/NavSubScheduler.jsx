import React from "react";

import CreateEvent from "./Dialogs/CreateEvent";
import "../styles/NavMain.css";

const NavSubScheduler = (props) => {
  return (
    <nav className="NavMain">
      <ul className="nav-list-sub">
        <React.Fragment>
          <li>
            <CreateEvent />
          </li>
        </React.Fragment>
      </ul>
    </nav>
  );
};

export default NavSubScheduler;
