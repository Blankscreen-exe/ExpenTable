import { useEffect } from "react";
import { Link } from "react-router-dom";

import "../../static/css/Home.css";
import { getTableStats, getWeekStart, sortByPriority } from "../../helpers";
import appConstants from "../../appConstants";
import {
  useLocalStorage,
  useTodayDay,
  useWindowSize,
} from "../../customHooks";

// Components
import WeekTable from "./WeekTable";
import TodayView from "./TodayView";
import { useCategories } from "../form/FormContext";

function Home() {
  const { categories } = useCategories();
  const data = sortByPriority(categories);
  const { itemNames, choreList } = getTableStats(data);
  const [taskCompleted, setTaskCompleted] = useLocalStorage(
    appConstants.localStorageKey,
    {}
  );
  const today = useTodayDay();
  const weekStart = getWeekStart();
  const [savedWeekStart, setSavedWeekStart] = useLocalStorage(
    appConstants.weekStartKey,
    weekStart
  );
  const [savedView, setSavedView] = useLocalStorage(
    appConstants.homeViewKey,
    null
  );
  const { width } = useWindowSize();

  // Phones open on today's tasks, bigger screens on the whole week
  const view =
    savedView ?? (width <= appConstants.mobileBreakpoint ? "today" : "week");

  // A new week starts with a blank slate
  useEffect(() => {
    if (savedWeekStart !== weekStart) {
      setTaskCompleted({});
      setSavedWeekStart(weekStart);
    }
  }, [savedWeekStart, weekStart, setTaskCompleted, setSavedWeekStart]);

  const handleTaskDoneChange = (task_id, isDone) => {
    setTaskCompleted((prevState) => {
      return {
        ...prevState,
        [task_id]: isDone,
      };
    });
  };

  if (data.length === 0) {
    return (
      <div className="section is-flex is-flex-direction-column is-align-items-center">
        <h2 className="subtitle">No categories has been added yet!</h2>
        <Link to={appConstants.routes.form} className="has-text-primary">
          Click here to add a new category
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="buttons has-addons is-centered view-switch">
        <button
          type="button"
          onClick={() => setSavedView("today")}
          className={`button is-small ${
            view === "today" ? "is-primary is-selected" : ""
          }`}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => setSavedView("week")}
          className={`button is-small ${
            view === "week" ? "is-primary is-selected" : ""
          }`}
        >
          Week
        </button>
      </div>
      {view === "today" ? (
        <TodayView
          categories={data}
          choreList={choreList}
          taskCompleted={taskCompleted}
          today={today}
          onTaskDoneChange={handleTaskDoneChange}
        />
      ) : (
        <WeekTable
          itemNames={itemNames}
          choreList={choreList}
          taskCompleted={taskCompleted}
          today={today}
          onTaskDoneChange={handleTaskDoneChange}
        />
      )}
    </div>
  );
}

export default Home;
