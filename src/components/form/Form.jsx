import "./Form.css";
import { Input, Select, Button } from "./index";
import appConstants from "../../appConstants";
import { useCategories } from "./FormContext";

function Form({
  selectedCategory,
  handleSelectChange,
  handlePriorityChange,
  handleDaysInputChange,
  openModal
}) {
  const { days: weekDays, fullDays: fullWeekDays } = appConstants;
  const { categories } = useCategories();

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center">
      {categories.length ? (
        <form className="form">
          <div className="field is-grouped is-justify-content-space-between is-flex-wrap-wrap">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label htmlFor="categories" className="label">
                  Category:
                </label>
              </div>
              <div className="field-body">
                <div className="field has-addons">
                  <div className="control">
                    <div className="select is-primary">
                      <Select
                        value={selectedCategory.title}
                        onChange={handleSelectChange}
                        name="categories"
                        id="categories-dropdown"
                        options={categories.map((item) => item.title)}
                      />
                    </div>
                  </div>
                  <div className="control">
                    <Button
                      className="is-primary is-outlined"
                      onClick={openModal}
                      content="Edit"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label htmlFor="priority" className="label">
                  Priority:
                </label>
              </div>
              <div className="field-body">
                <div className="control">
                  <div className="select is-primary">
                    <Select
                      name="priority"
                      id="priority"
                      value={selectedCategory.priority}
                      onChange={handlePriorityChange}
                      options={[1, 2, 3, 4, 5]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {weekDays.map((day, index) => {
              return (
                <div key={day}>
                  <hr></hr>
                  <h2 style={{ marginBottom: "1rem" }} className="subtitle">
                    {fullWeekDays[index]}
                  </h2>
                  <div className="field is-grouped is-flex-wrap-wrap">
                    <div className="field title-input__field">
                      <label htmlFor={`${day}-title`} className="label">
                        Title
                      </label>
                      <div className="control has-icons-left">
                        <Input
                          onChange={handleDaysInputChange}
                          name={`${day}-title`}
                          id={`${day}-title`}
                          value={selectedCategory.days[day]?.title || ""}
                        />
                        <span className="icon custom-icon is-left">
                          <i className="fa-regular fa-pen-to-square"></i>
                        </span>
                      </div>
                    </div>
                    <div className="field allottedTime-input__field">
                      <label htmlFor={`${day}-allottedTime`} className="label">
                        Alloted time
                      </label>
                      <div className="control has-icons-left">
                        <Input
                          onChange={handleDaysInputChange}
                          type="number"
                          step={0.5}
                          name={`${day}-allottedTime`}
                          id={`${day}-allotted-time`}
                          value={selectedCategory.days[day]?.allottedTime || ""}
                          inputMode="numeric"
                          min={0.5}
                        />
                        <span className="icon custom-icon is-left is-primary">
                          <i className="fa-regular fa-clock"></i>
                        </span>
                      </div>
                      <span>* pomodoros</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
      ) : (
        <div
          style={{ height: "24rem" }}
          className="is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-row-gap-2"
        >
          <h2 className="subtitle has-text-centered">
            You still have no categories created.
          </h2>
          <Button
            className="is-primary is-outlined"
            onClick={openModal}
            content="Create a new category"
          />
        </div>
      )}
    </div>
  );
}

export default Form;
