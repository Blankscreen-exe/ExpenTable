import { useState } from "react";
import { Link } from "react-router-dom";

import { toTitleCase, formatTime, combineClassNames } from "../../helpers";
import appConstants from "../../appConstants";

const hasTitle = (chore) => chore?.title && chore.title.trim() !== "";

function TodayView({ categories, choreList, taskCompleted, today, onTaskDoneChange }) {
  // null means "follow today", so the view moves on by itself at midnight
  const [pickedDay, setPickedDay] = useState(null);
  const day = pickedDay ?? today;
  const isItToday = day === today;

  const tasks = choreList[day]
    .map((chore, ind) => chore && { ...chore, category: categories[ind].title })
    .filter(hasTitle);

  const doneCount = tasks.filter((task) => taskCompleted[task.task_id]).length;
  const totalTime = tasks.reduce(
    (acc, curr) =>
      acc + (curr.allottedTime || 0) * appConstants.pomodoroMultiplier,
    0
  );

  return (
    <div className="today-view px-4 pb-4">
      <div className="day-strip" role="tablist" aria-label="Day of the week">
        {appConstants.days.map((weekDay) => (
          <button
            key={weekDay}
            type="button"
            role="tab"
            aria-selected={weekDay === day}
            onClick={() => setPickedDay(weekDay === today ? null : weekDay)}
            className={combineClassNames(
              "day-strip__day",
              weekDay === day ? "is-selected" : "",
              weekDay === today ? "is-today" : ""
            )}
          >
            <span>{toTitleCase(weekDay)}</span>
            <span className="day-strip__count">
              {choreList[weekDay].filter(hasTitle).length}
            </span>
          </button>
        ))}
      </div>

      <div className="today-summary">
        <div className="is-flex is-justify-content-space-between is-align-items-baseline">
          <h2 className="subtitle mb-2">
            {isItToday
              ? "Today"
              : appConstants.fullDays[appConstants.days.indexOf(day)]}
          </h2>
          {tasks.length > 0 && (
            <span className="today-summary__meta">
              {doneCount} of {tasks.length} done &middot; {formatTime(totalTime)}
            </span>
          )}
        </div>
        {tasks.length > 0 && (
          <progress
            className="progress is-primary is-small"
            value={doneCount}
            max={tasks.length}
          />
        )}
      </div>

      {tasks.length > 0 ? (
        <ul className="task-list">
          {tasks.map((task) => {
            const isDone = taskCompleted[task.task_id] ? true : false;

            return (
              <li key={task.task_id}>
                <button
                  type="button"
                  aria-pressed={isDone}
                  disabled={!isItToday}
                  onClick={() => onTaskDoneChange(task.task_id, !isDone)}
                  className={combineClassNames(
                    "task-card",
                    isDone ? "is-done" : ""
                  )}
                >
                  <span className="icon task-card__check">
                    <i
                      className={
                        isDone
                          ? "fa-solid fa-circle-check fa-xl"
                          : "fa-regular fa-circle fa-xl"
                      }
                    ></i>
                  </span>
                  <span className="task-card__body">
                    <span className="task-card__category">
                      {toTitleCase(task.category)}
                    </span>
                    <span className="task-card__title">{task.title}</span>
                  </span>
                  {task.allottedTime ? (
                    <span className="task-card__time">
                      {formatTime(
                        task.allottedTime * appConstants.pomodoroMultiplier
                      )}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="has-text-centered py-6">
          <p className="mb-2">
            Nothing planned for {isItToday ? "today" : "this day"}.
          </p>
          <Link to={appConstants.routes.form} className="has-text-primary">
            Edit your week
          </Link>
        </div>
      )}

      {!isItToday && (
        <p className="has-text-centered mt-4">
          <button
            type="button"
            className="button is-primary is-outlined is-small"
            onClick={() => setPickedDay(null)}
          >
            Back to today
          </button>
        </p>
      )}
    </div>
  );
}

export default TodayView;
