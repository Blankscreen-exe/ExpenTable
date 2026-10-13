import "../../static/css/DayStrip.css";
import appConstants from "../../appConstants";
import { toTitleCase, combineClassNames } from "../../helpers";

function DayStrip({ selectedDay, today, counts, onSelect }) {
  return (
    <div className="day-strip" role="tablist" aria-label="Day of the week">
      {appConstants.days.map((weekDay) => (
        <button
          key={weekDay}
          type="button"
          role="tab"
          aria-selected={weekDay === selectedDay}
          onClick={() => onSelect(weekDay)}
          className={combineClassNames(
            "day-strip__day",
            weekDay === selectedDay ? "is-selected" : "",
            weekDay === today ? "is-today" : ""
          )}
        >
          <span>{toTitleCase(weekDay)}</span>
          <span className="day-strip__count">{counts[weekDay]}</span>
        </button>
      ))}
    </div>
  );
}

export default DayStrip;
