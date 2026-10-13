import { useState } from "react";
import { Input, Button } from "./index";
import appConstants from "../../appConstants";
import {
  toTitleCase,
  formatTime,
  isSameTask,
  combineClassNames,
} from "../../helpers";

const timeStep = 0.5;

function DayTaskCard({
  category,
  day,
  onTaskChange,
  onRepeatToggle,
  onRepeatEveryDay,
}) {
  const [repeatOpen, setRepeatOpen] = useState(false);
  const task = category.days?.[day];
  const title = task?.title || "";
  const allottedTime = task?.allottedTime || 0;
  const inputId = `${category.id}-${day}-title`;

  const changeTime = (change) => {
    onTaskChange(
      category.id,
      day,
      "allottedTime",
      Math.max(0, allottedTime + change)
    );
  };

  return (
    <div className="edit-card">
      <label htmlFor={inputId} className="edit-card__category">
        {toTitleCase(category.title)}
      </label>
      <div className="control has-icons-left">
        <Input
          id={inputId}
          name={inputId}
          value={title}
          placeholder="Nothing planned"
          enterKeyHint="done"
          onChange={(e) =>
            onTaskChange(category.id, day, "title", e.target.value)
          }
        />
        <span className="icon custom-icon is-left">
          <i className="fa-regular fa-pen-to-square"></i>
        </span>
      </div>
      <div className="edit-card__row">
        <div className="stepper">
          <Button
            className="is-primary is-outlined"
            aria-label="Less time"
            disabled={allottedTime <= 0}
            onClick={() => changeTime(-timeStep)}
            content={<i className="fa-solid fa-minus"></i>}
          />
          <span className="stepper__value">
            <strong>{allottedTime}</strong>
            <span>pomodoros</span>
          </span>
          <Button
            className="is-primary is-outlined"
            aria-label="More time"
            onClick={() => changeTime(timeStep)}
            content={<i className="fa-solid fa-plus"></i>}
          />
          {allottedTime > 0 && (
            <span className="stepper__time">
              {formatTime(allottedTime * appConstants.pomodoroMultiplier)}
            </span>
          )}
        </div>
        {title.trim() !== "" && (
          <Button
            className={combineClassNames(
              "is-small is-primary",
              repeatOpen ? "" : "is-outlined"
            )}
            aria-expanded={repeatOpen}
            onClick={() => setRepeatOpen((prevValue) => !prevValue)}
            content={
              <>
                <span className="icon is-small">
                  <i className="fa-solid fa-repeat"></i>
                </span>
                <span>Repeat</span>
              </>
            }
          />
        )}
      </div>
      {repeatOpen && title.trim() !== "" && (
        <div className="repeat-days">
          {appConstants.days.map((weekDay) => {
            const isRepeated =
              weekDay === day || isSameTask(category.days?.[weekDay], task);

            return (
              <button
                key={weekDay}
                type="button"
                aria-pressed={isRepeated}
                disabled={weekDay === day}
                onClick={() => onRepeatToggle(category.id, day, weekDay)}
                className={combineClassNames(
                  "repeat-days__day",
                  isRepeated ? "is-repeated" : ""
                )}
              >
                {toTitleCase(weekDay)}
              </button>
            );
          })}
          <button
            type="button"
            className="repeat-days__day repeat-days__all"
            onClick={() => onRepeatEveryDay(category.id, day)}
          >
            Every day
          </button>
        </div>
      )}
    </div>
  );
}

export default DayTaskCard;
