import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import appConstants from "../../appConstants";
import { combineClassNames } from "../../helpers";

function Tabs() {
    const currentPath = useLocation().pathname;
  return (
    <div className="tabs-container">
      <div className="tabs is-centered">
        <ul>
          <li className={currentPath==appConstants.routes.home ? "is-active is-active-tab" : ""}>
            <NavLink to={appConstants.routes.home} >Home</NavLink>
          </li>
          <li className={currentPath==appConstants.routes.form ? "is-active is-active-tab" : ""}>
            <NavLink to={appConstants.routes.form} >Edit Tasks</NavLink>
          </li>
          <li className={currentPath==appConstants.routes.about ? "is-active is-active-tab" : ""}>
            <NavLink to={appConstants.routes.about} >About</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Tabs;
