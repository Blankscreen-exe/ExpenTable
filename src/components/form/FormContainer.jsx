import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../../static/css/Form.css";
import { DayTaskCard, CategoryList } from "./index";
import DayStrip from "../common/DayStrip";
import { useCategories } from "./FormContext";
import { useTodayDay } from "../../customHooks";
import { sortByPriority, isSameTask } from "../../helpers";
import appConstants from "../../appConstants";

const hasTitle = (task) => task?.title && task.title.trim() !== "";

const FormContainer = () => {
  const { categories, setCategories } = useCategories();
  const today = useTodayDay();
  const [searchParams] = useSearchParams();
  // Home links here with the day it was showing, e.g. /edit?day=sat
  const [day, setDay] = useState(() => {
    const requestedDay = searchParams.get("day");
    return appConstants.days.includes(requestedDay) ? requestedDay : today;
  });

  const updateDays = (categoryId, getNewDays) => {
    setCategories((prevValue) =>
      prevValue.map((category) =>
        category.id === categoryId
          ? { ...category, days: getNewDays(category.days || {}) }
          : category
      )
    );
  };

  // Change the title or the allotted time of a category's task on a given day
  const handleTaskChange = (categoryId, taskDay, property, value) => {
    updateDays(categoryId, (days) => {
      const task = { ...(days[taskDay] || {}), [property]: value };
      const newDays = { ...days, [taskDay]: task };

      // Nothing left in it, so the day goes back to being unplanned
      if (!task.title && !task.allottedTime) delete newDays[taskDay];

      return newDays;
    });
  };

  // Put the task of `fromDay` on `toDay`, or take it off if it is already there
  const handleRepeatToggle = (categoryId, fromDay, toDay) => {
    updateDays(categoryId, (days) => {
      const newDays = { ...days };

      if (isSameTask(days[toDay], days[fromDay])) {
        delete newDays[toDay];
      } else {
        newDays[toDay] = { ...days[fromDay] };
      }

      return newDays;
    });
  };

  const handleRepeatEveryDay = (categoryId, fromDay) => {
    updateDays(categoryId, (days) =>
      Object.fromEntries(
        appConstants.days.map((weekDay) => [weekDay, { ...days[fromDay] }])
      )
    );
  };

  return (
    <section className="edit-page px-4 pb-4">
      {categories.length > 0 ? (
        <>
          <DayStrip
            selectedDay={day}
            today={today}
            counts={Object.fromEntries(
              appConstants.days.map((weekDay) => [
                weekDay,
                categories.filter((category) =>
                  hasTitle(category.days?.[weekDay])
                ).length,
              ])
            )}
            onSelect={setDay}
          />
          <h2 className="subtitle mb-3">
            {appConstants.fullDays[appConstants.days.indexOf(day)]}
          </h2>
          <ul className="edit-task-list">
            {sortByPriority(categories).map((category) => (
              <li key={category.id}>
                <DayTaskCard
                  category={category}
                  day={day}
                  onTaskChange={handleTaskChange}
                  onRepeatToggle={handleRepeatToggle}
                  onRepeatEveryDay={handleRepeatEveryDay}
                />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h2 className="subtitle has-text-centered py-5">
          You still have no categories created.
        </h2>
      )}
      <CategoryList />
    </section>
  );
};

export default FormContainer;
