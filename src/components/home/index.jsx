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
    const [taskCompleted, setTaskCompleted] = useState({})
    const today = new Date().getDay();

    console.log(taskCompleted)

    const handleTaskDoneChange = (event, task_id) => {
      setTaskCompleted(prevState => {
        return {
        ...prevState,
        [task_id]:event.target.checked
        }
      })
    }

  return (
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
                          (<TaskCell 
                              key={ind}
                              day={day}
                              value={chore ? chore.title : "-"}
                              isDone={chore?.task_id && taskCompleted[chore.task_id] ? true : false }
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
              <tr>
                <td></td>
                <td></td>
                {choreList[getTodayDay()].map( (item, ind) => (
                  <AllottedTimeCell key={ind}
                    value={item ? <input type="checkbox" onChange={(e) => handleTaskDoneChange(e, item.task_id)} checked={taskCompleted[item.task_id] ? true : false} /> : ""}
                  />
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
  );
}

export default Home;
