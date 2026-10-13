import { toTitleCase, formatTime } from "../../helpers";
import appConstants from "../../appConstants";

// Components
import HeaderCell from "./cells/HeaderCell";
import DayCell from "./cells/DayCell";
import TaskCountCell from "./cells/TaskCountCell";
import TaskCell from "./cells/TaskCell";
import AllottedTimeCell from "./cells/AllottedTimeCell";

function WeekTable({ itemNames, choreList, taskCompleted, today, onTaskDoneChange }) {
  return (
    <div className="px-4 py-4 mx-3 columns is-desktop is-centered">
      <div className="table-container">
        <table className="table is-striped is-bordered ">
          <thead>
            <tr>
              <HeaderCell value={"Days"} />
              <HeaderCell value={"Task Count"} />
              {itemNames.map((item, ind) => {
                return <HeaderCell key={ind} value={toTitleCase(item.title)} />;
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
              <td className="has-text-centered">
                <div
                  className=" has-background-danger  has-text-black has-text-weight-bold"
                  style={{
                    borderRadius: "5px",
                    padding: "0.125rem",
                  }}
                >
                  {formatTime(
                    (choreList[today] || []).reduce(
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
              {choreList[today].map((item, ind) => (
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
              {choreList[today].map((item, ind) => (
                <AllottedTimeCell
                  key={ind}
                  value={
                    item ? (
                      <input
                        type="checkbox"
                        className="custom-task-checkbox"
                        onChange={(e) =>
                          onTaskDoneChange(item.task_id, e.target.checked)
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
      </div>
    </div>
  );
}

export default WeekTable;
