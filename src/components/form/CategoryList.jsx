import { useState } from "react";
import { Input, Select, Button, DeleteModal } from "./index";
import { useCategories } from "./FormContext";

function CategoryRow({ category, getTitleWarning, onChange, onDelete }) {
  // The title is only saved once it is valid, so typing is never blocked
  const [draftTitle, setDraftTitle] = useState(category.title);
  const [warning, setWarning] = useState("");

  const handleTitleBlur = () => {
    const titleWarning = getTitleWarning(draftTitle, category.id);
    setWarning(titleWarning);

    if (!titleWarning) {
      setDraftTitle(draftTitle.trim());
      onChange(category.id, { title: draftTitle.trim() });
    }
  };

  return (
    <li className="category-row">
      <div className="control category-row__title">
        <Input
          name={`title-${category.id}`}
          aria-label="Category title"
          placeholder="Title"
          value={draftTitle}
          enterKeyHint="done"
          onChange={(e) => {
            setDraftTitle(e.target.value);
            setWarning("");
          }}
          onBlur={handleTitleBlur}
          onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
          className={warning ? "is-danger warning-animation" : ""}
        />
        {warning && <span className="has-text-danger">{warning}</span>}
      </div>
      <label className="category-row__priority">
        <span>Priority</span>
        <div className="select">
          <Select
            name={`priority-${category.id}`}
            value={category.priority || 1}
            onChange={(e) =>
              onChange(category.id, { priority: Number(e.target.value) })
            }
            options={[1, 2, 3, 4, 5]}
          />
        </div>
      </label>
      <Button
        className="is-danger is-outlined"
        aria-label={`Delete ${category.title}`}
        onClick={() => onDelete(category.id)}
        content={<i className="fa-regular fa-trash-can"></i>}
      />
    </li>
  );
}

function CategoryList() {
  const { categories, setCategories } = useCategories();
  const [newTitle, setNewTitle] = useState("");
  const [newTitleWarning, setNewTitleWarning] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState("");

  const getTitleWarning = (title, ownId) => {
    const cleanTitle = title.trim().toLowerCase();

    if (!cleanTitle) return "Please enter a title!";

    const isRepeated = categories.some(
      (category) =>
        category.id !== ownId &&
        category.title.trim().toLowerCase() === cleanTitle
    );

    return isRepeated ? "Cannot have repeated titles!" : "";
  };

  const addCategoryHandler = (e) => {
    e.preventDefault();

    const titleWarning = getTitleWarning(newTitle);
    setNewTitleWarning(titleWarning);
    if (titleWarning) return;

    const newCategory = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      priority: 1,
      done: false,
      days: {},
    };

    setCategories((prevValue) => [newCategory, ...prevValue]);
    setNewTitle("");
  };

  const handleCategoryChange = (id, changes) => {
    setCategories((prevValue) =>
      prevValue.map((category) =>
        category.id === id ? { ...category, ...changes } : category
      )
    );
  };

  const closeDeleteModal = (result) => {
    setCategories((prevValue) => (result ? result : prevValue));
    setCategoryToDelete("");
  };

  return (
    <div className="category-list">
      <h2 className="subtitle mb-3">Categories</h2>
      <form className="category-list__add" onSubmit={addCategoryHandler}>
        <div className="control">
          <Input
            name="new-category"
            aria-label="New category title"
            placeholder="New category"
            value={newTitle}
            enterKeyHint="done"
            onChange={(e) => {
              setNewTitle(e.target.value);
              setNewTitleWarning("");
            }}
            className={newTitleWarning ? "is-danger warning-animation" : ""}
          />
          {newTitleWarning && (
            <span className="has-text-danger">{newTitleWarning}</span>
          )}
        </div>
        <Button type="submit" className="is-primary" content="Add" />
      </form>
      <ul>
        {categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            getTitleWarning={getTitleWarning}
            onChange={handleCategoryChange}
            onDelete={setCategoryToDelete}
          />
        ))}
      </ul>
      <div className={`modal-overlay ${categoryToDelete ? "open" : ""}`} />
      {categoryToDelete && (
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          categoryToDeleteId={categoryToDelete}
        />
      )}
    </div>
  );
}

export default CategoryList;
