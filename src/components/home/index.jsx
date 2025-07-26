import React, { useState } from "react";

import tableData from "../../data/table.json";
import pack from "../../../package.json";
import {
  toTitleCase,
  getTableStats,
  getTodayDay,
  formatTime,
} from "../../helpers";
import appConstants from "../../appConstants";
import { useLocalStorage } from "../../customHooks";

// Components
import HeaderCell from "./cells/HeaderCell";
import DayCell from "./cells/DayCell";
import TaskCountCell from "./cells/TaskCountCell";
import TaskCell from "./cells/TaskCell";
import AllottedTimeCell from "./cells/AllottedTimeCell";
import { useCategories } from "../form/FormContext";

function Home() {
  const [taskCategory, setTaskCategory] = useState([]);
  const { categories: data } = useCategories();
  const { itemNames, itemCount, choreList } = getTableStats(data);
  const [taskCompleted, setTaskCompleted] = useLocalStorage(
    appConstants.localStorageKey,
    {}
  );

  const handleTaskDoneChange = (event, task_id) => {
    setTaskCompleted((prevState) => {
      return {
        ...prevState,
        [task_id]: event.target.checked,
      };
    });
  };

  return (
    <div className="px-4 py-4 mx-3 columns is-desktop is-centered">
      <div className="table-container">
        {data.length > 0 ? (
          <table className="table is-striped is-bordered ">
            <thead>
              <tr>
                <HeaderCell value={"Days"} />
                <HeaderCell value={"Task Count"} />
                {itemNames.map((item, ind) => {
                  return (
                    <HeaderCell key={ind} value={toTitleCase(item.title)} />
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {appConstants.days.map((day, ind) => (
                <tr key={ind}>
                  <DayCell value={toTitleCase(day)} />
                  <TaskCountCell
                    value={
                      choreList[day].filter(
                        (chore) => chore?.title && chore.title.trim() !== ""
                      ).length
                    }
                  />
                  {choreList[day].map((chore, ind) => (
                    <TaskCell
                      key={ind}
                      day={day}
                      value={chore?.title}
                      isDone={
                        chore?.task_id && taskCompleted[chore.task_id]
                          ? true
                          : false
                      }
                    />
                  ))}
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                  <td
                    className='has-text-centered'
                  >
                  <div className=" has-background-danger  has-text-black has-text-weight-bold"
                    style={{
                      borderRadius: '5px',
                      padding: '0.125rem',
                    }}>
                    {formatTime(
                      (choreList[getTodayDay()] || []).reduce(
                        (acc, curr) =>
                          acc +
                          (curr?.allottedTime
                            ? curr.allottedTime * appConstants.pomodoroMultiplier
                            : 0),
                        0
                      )
                    )}
                  </div>
                  </td>
                {choreList[getTodayDay()].map((item, ind) => (
                  <AllottedTimeCell
                    key={ind}
                    value={
                      item
                        ? item.allottedTime &&
                          formatTime(
                            item.allottedTime * appConstants.pomodoroMultiplier
                          )
                        : "N/A"
                    }
                  />
                ))}
              </tr>
              <tr>
                <td></td>
                <td></td>
                {choreList[getTodayDay()].map((item, ind) => (
                  <AllottedTimeCell
                    key={ind}
                    value={
                      item ? (
                        <input
                          type="checkbox"
                          className="custom-task-checkbox"
                          onChange={(e) =>
                            handleTaskDoneChange(e, item.task_id)
                          }
                          checked={taskCompleted[item.task_id] ? true : false}
                        />
                      ) : (
                        ""
                      )
                    }
                  />
                ))}
              </tr>
            </tfoot>
          </table>
        ) : (
          <div className="section is-flex is-flex-direction-column is-align-items-center">
            <h2 className="subtitle">No categories has been added yet!</h2>
            <a href="/edit" className="has-text-primary">
              Click here to add a new category
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
