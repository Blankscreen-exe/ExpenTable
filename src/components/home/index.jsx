import { toTitleCase, getTableStats, getTodayDay } from "../../helpers";
import appConstants from "../../appConstants";
import { useLocalStorage } from "../../customHooks";

// Components
import HeaderCell from "./cells/HeaderCell";
import DayCell from "./cells/DayCell";
import TaskCountCell from "./cells/TaskCountCell";
import TaskCell from "./cells/TaskCell";
import AllottedTimeCell from "./cells/AllottedTimeCell";

const dummyData = [
  {
    id: "id1",
    title: "Morning Routine",
    priority: 0,
    done: false,
    days: {
      mon: {
        title: "todo",
        allottedTime: 3,
      },
      tue: {
        title: "todo",
        allottedTime: 3,
      },
      wed: {
        title: "todo",
        allottedTime: 3,
      },
      thu: {
        title: "todo",
        allottedTime: 3,
      },
      fri: {
        title: "todo",
        allottedTime: 3,
      },
    },
  },
  {
    id: "id2",
    title: "Work Tasks",
    priority: 0,
    done: false,
    days: {
      mon: {
        title: "todo",
        allottedTime: 3,
      },
      wed: {
        title: "todo",
        allottedTime: 3,
      },
      fri: {
        title: "todo",
        allottedTime: 3,
      },
    },
  },
];

function Home() {
  const [tableData] = useLocalStorage(appConstants.localStorageKey, dummyData);
  const { itemNames, itemCount, choreList } = getTableStats(
    Array.isArray(tableData) ? tableData : []
  );
  const [taskCompleted, setTaskCompleted] = useLocalStorage(
    appConstants.localStorageKey + "_completed",
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

  if (!tableData || !Array.isArray(tableData) || tableData.length === 0) {
    return (
      <div className="has-text-centered p-6">
        <h2 className="title is-2">No Data To Show</h2>
        <p className="subtitle">
          Please add some tasks in the Edit Tasks section to get started.
        </p>
      </div>
    );
  }

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
                  value={item ? item.allottedTime : "N/A"}
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
                        onChange={(e) => handleTaskDoneChange(e, item.task_id)}
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

export default Home;
