import "./Form.css";
import { Input, Select, Button } from "./index";
import appConstants from "../../appConstants";
import { useCategories } from "./FormContext";
import { useWindowSize } from "../../customHooks";

function Form({
  sliderIndex,
  sliderLoaded,
  handleSliderChange,
  selectedCategory,
  handleSelectChange,
  handlePriorityChange,
  handleDaysInputChange,
  openModal,
}) {
  const { days: weekDays, fullDays: fullWeekDays } = appConstants;
  const { categories } = useCategories();
  const size = useWindowSize();

  return (
    <div className="is-flex is-flex-direction-column is-align-items-center mx-4">
      {selectedCategory ? (
        <form className="form">
          <div
            style={{ paddingInline: "2rem" }}
            className="field is-grouped is-justify-content-space-between is-flex-wrap-wrap"
          >
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
                        value={selectedCategory?.title || ""}
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
                      value={selectedCategory?.priority || 1}
                      onChange={handlePriorityChange}
                      options={[1, 2, 3, 4, 5]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            {size.width < 601 ? (
              <div>
                <div className="drag-scroll">
                  <div className="dragged-items">
                    <button className="day-switch">M</button>
                    <button className="day-switch">T</button>
                    <button className="day-switch">W</button>
                    <button className="day-switch">T</button>
                    <button className="day-switch">F</button>
                    <button className="day-switch">S</button>
                    <button className="day-switch">S</button>
                  </div>
                </div>
                <div className="is-flex is-align-items-center is-column-gap-3 px-5">
                  <button
                    type="button"
                    onClick={() => handleSliderChange(false)}
                  >
                    <i className="fa-solid fa-angle-left fa-xl"></i>
                  </button>
                  <div
                    className={`slider-content ${
                      sliderLoaded ? "slider-loaded" : ""
                    }`}
                  >
                    <hr></hr>
                    <h2 style={{ marginBottom: "1rem" }} className="subtitle">
                      {fullWeekDays[sliderIndex]}
                    </h2>
                    <div className="field is-grouped is-flex-wrap-wrap">
                      <div className="field title-input__field">
                        <label
                          htmlFor={`${weekDays[sliderIndex]}-title`}
                          className="label"
                        >
                          Title
                        </label>
                        <div className="control has-icons-left">
                          <Input
                            onChange={handleDaysInputChange}
                            name={`${weekDays[sliderIndex]}-title`}
                            id={`${weekDays[sliderIndex]}-title`}
                            value={
                              selectedCategory.days[weekDays[sliderIndex]]
                                ?.title || ""
                            }
                          />
                          <span className="icon custom-icon is-left">
                            <i className="fa-regular fa-pen-to-square"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field allottedTime-input__field">
                        <label
                          htmlFor={`${weekDays[sliderIndex]}-allottedTime`}
                          className="label"
                        >
                          Alloted time
                        </label>
                        <div className="control has-icons-left">
                          <Input
                            onChange={handleDaysInputChange}
                            type="number"
                            step={0.5}
                            name={`${weekDays[sliderIndex]}-allottedTime`}
                            id={`${weekDays[sliderIndex]}-allotted-time`}
                            value={
                              selectedCategory.days[weekDays[sliderIndex]]
                                ?.allottedTime || ""
                            }
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
                  <button type="button" onClick={handleSliderChange}>
                    <i className="fa-solid fa-angle-right fa-xl"></i>
                  </button>
                </div>
              </div>
            ) : (
              weekDays.map((day, index) => {
                return (
                  <div key={day} style={{ paddingInline: "2rem" }}>
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
                        <label
                          htmlFor={`${day}-allottedTime`}
                          className="label"
                        >
                          Alloted time
                        </label>
                        <div className="control has-icons-left">
                          <Input
                            onChange={handleDaysInputChange}
                            type="number"
                            step={0.5}
                            name={`${day}-allottedTime`}
                            id={`${day}-allotted-time`}
                            value={
                              selectedCategory.days[day]?.allottedTime || ""
                            }
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
              })
            )}
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
