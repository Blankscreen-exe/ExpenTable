import { useCategories } from "../FormContext";
import { Input, Select, Button } from "../index";
import "../../../static/css/Modal.css";

function Modal({
  deleteModal,
  addCategoryHandler,
  handleCloseModal,
  warnings,
  handleTitleChange,
  handlePriorityChange,
  checkDeleteAnswer,
}) {
  const { categories } = useCategories();
  return (
    <div className="form-modal-card">
      <div className={`modal-overlay ${deleteModal ? "open" : ""}`} />
      <form className="modal-content">
        <div
          style={categories.length > 0 ? { marginBottom: "1.5rem" } : {}}
          className="modal-top is-display-grid is-align-items-center is-justify-content-space-between"
        >
          <span className="subtitle modal-span">Categories</span>
          <div className="add-category-btn control modal-control">
            <Button
              onClick={addCategoryHandler}
              className="is-primary is-outlined"
              content="Add Category"
            />
          </div>
          <div className="control has-icons">
            <Button
              onClick={handleCloseModal}
              content={
                <span className="icon is-left">
                  <i className="fa-solid fa-xmark fa-lg"></i>
                </span>
              }
              className="no-border no-hover"
            />
          </div>
        </div>
        {categories.map((category, index) => {
          return (
            <div key={category.id}>
              <div className="custom-field field is-grouped is-column-gap-2 is-flex-wrap-wrap">
                <div className="control custom-control">
                  <Input
                    name={`title-${index}`}
                    id={`title-${index}`}
                    data-id={category.id}
                    onChange={handleTitleChange}
                    placeholder="Title"
                    value={category.title}
                    className={
                      warnings[category.id]?.titleWarning ||
                      warnings[category.id]?.repeatedTitleWarning
                        ? "is-danger warning-animation"
                        : ""
                    }
                  />
                  <span
                    className={`has-text-danger ${
                      warnings[category.id]?.titleWarning
                        ? "is-display-block"
                        : "is-display-none"
                    }`}
                  >
                    Please enter a title!
                  </span>
                  <span
                    className={`has-text-danger ${
                      warnings[category.id]?.repeatedTitleWarning
                        ? "is-display-block"
                        : "is-display-none"
                    }`}
                  >
                    Cannot have repeated titles!
                  </span>
                </div>
                <div className="control">
                  <div className="select is-primary">
                    <Select
                      onChange={handlePriorityChange}
                      name={`priority-${index}`}
                      id={category.id ? category.id : ""}
                      value={category?.priority || ""}
                      options={[1, 2, 3, 4, 5]}
                      placeholder="Priority"
                    />
                  </div>
                </div>
                <div className="control">
                  <Button
                    data-delete_id={category.id}
                    onClick={checkDeleteAnswer}
                    className="is-danger"
                    content="Delete"
                  />
                </div>
              </div>
              {categories.length - 1 !== index && (
                <hr style={{ margin: "1rem 0" }} />
              )}
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default Modal;
