import React from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import appConstants from "../../appConstants";

const tabs = [
  { route: appConstants.routes.home, label: "Home", icon: "fa-solid fa-calendar-day" },
  { route: appConstants.routes.form, label: "Edit Tasks", icon: "fa-regular fa-pen-to-square" },
  { route: appConstants.routes.about, label: "About", icon: "fa-solid fa-circle-info" },
];

function Tabs() {
    const currentPath = useLocation().pathname;
  return (
    <nav className="tabs-container">
      <div className="tabs is-centered">
        <ul>
          {tabs.map((tab) => (
            <li key={tab.route} className={currentPath==tab.route ? "is-active is-active-tab" : ""}>
              <NavLink to={tab.route} >
                <span className="icon is-small"><i className={tab.icon}></i></span>
                <span>{tab.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Tabs;
