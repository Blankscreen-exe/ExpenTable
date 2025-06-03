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

function Home() {
  const [taskCategory, setTaskCategory] = useState([]);
  const [data, setData] = useLocalStorage(appConstants.categoriesKey, []);
  const { itemNames, itemCount, choreList } = getTableStats(data);
  const [taskCompleted, setTaskCompleted] = useLocalStorage(
    appConstants.localStorageKey,
    {}
  );

  console.log(taskCompleted);

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
                  <TaskCountCell value={itemCount[day]} />
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
                <td></td>
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
                        <label
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            cursor: "pointer",
                            padding: "6px 12px",
                            border: "2px solid #ccc",
                            borderRadius: "8px",
                            backgroundColor: taskCompleted[item.task_id]
                              ? "#e6f4ea"
                              : "#fff",
                            transition: "all 0.3s ease",
                            fontSize: "14px",
                            fontWeight: 500,
                            gap: "10px",
                            userSelect: "none",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#999";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#ccc";
                          }}
                        >
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleTaskDoneChange(e, item.task_id)
                            }
                            checked={!!taskCompleted[item.task_id]}
                            style={{
                              appearance: "none",
                              width: "20px",
                              height: "20px",
                              border: "2px solid #ccc",
                              borderRadius: "4px",
                              backgroundColor: taskCompleted[item.task_id]
                                ? "#4CAF50"
                                : "#fff",
                              position: "relative",
                              transition: "all 0.2s ease",
                              display: "grid",
                              placeItems: "center",
                            }}
                          />
                          <span
                            style={{
                              content: '""',
                              width: "6px",
                              height: "12px",
                              border: "solid black",
                              borderWidth: "0 2px 2px 0",
                              transform: "rotate(45deg)",
                              opacity: taskCompleted[item.task_id] ? 1 : 0,
                              transition: "opacity 0.2s ease",
                              position: "absolute",
                              pointerEvents: "none",
                            }}
                          />
                          Done
                        </label>
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
