import React, {useState} from "react";

import tableData from '../../data/table.json'
import pack from '../../../package.json'
import {toTitleCase, getTableStats, getTodayDay } from "../../helpers";
import appConstants from "../../appConstants";

// Components
import HeaderCell from "./cells/HeaderCell";
import DayCell from "./cells/DayCell";
import TaskCountCell from "./cells/TaskCountCell";
import TaskCell from "./cells/TaskCell";
import AllottedTimeCell from "./cells/AllottedTimeCell";

function Home() {
    const [taskCategory, setTaskCategory] = useState([]);
    const {itemNames, itemCount, choreList} = getTableStats(tableData);

    const today = new Date().getDay();

  return (
      <div className="container main-container">
        <div className="header p-5">
          <div className="content-wrapper">
            <h1 className="title is-1 has-text-centered">ExpenTable <sub>{pack.version}</sub></h1>
            <p className="has-text-centered">
              An expendable time table. Manage your daily schedule with this
              feature-rich minimalistic timetable app. It storess all data
              locally so nothing ever leaves your device.
            </p>
          </div>
        </div>

        <div className="table-container is-flex is-justify-content-center mr-5 ml-5">
          <table className="table is-striped is-bordered ">
            <thead>
              <tr>
                <HeaderCell value={"Days"}/>
                <HeaderCell value={"Task Count"}/>
                {itemNames.map( (item, ind) => {
                    return (<HeaderCell key={ind} value={toTitleCase(item.title)} />);
                })}
              </tr>
            </thead>
            <tbody>
                {appConstants.days.map( (day, ind) => 
                    (<tr key={ind}>
                        <DayCell value={toTitleCase(day)} />
                        <TaskCountCell value={itemCount[day]}/>
                        {choreList[day].map( (chore, ind) => 
                            (<TaskCell key={ind}
                                value={chore ? chore.title : "-"}
                            />)
                        )}
                    </tr>)
                )}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                {choreList[getTodayDay()].map( (item, ind) => (
                  <AllottedTimeCell key={ind}
                    value={item ? item.allottedTime : "N/A"}
                  />
                ))}
              </tr>
            </tfoot>
          </table>
        </div>

        <footer className="footer p-5 mt-5 mx-5">
          <div className="content-wrapper has-text-centered">
            <p>&copy; 2024 Timetable App. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
  );
}

export default Home;
