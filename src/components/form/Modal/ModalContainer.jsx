import { useReducer, useState } from "react";
import Modal from "./Modal";
import { DeleteModal } from "../index";
import { WarningsReducer, warningsCases } from "./ModalReducers";
import { useCategories } from "../FormContext";

const { setTitleWarning, setRepeatedTitleWarning, removeId } = warningsCases;

const ModalContainer = ({ closeModal }) => {
  const [lastModifiedCategoryId, setLastModifiedCategoryId] = useState("");
  const { categories, setCategories } = useCategories();
  const [warnings, dispatch] = useReducer(WarningsReducer, {});
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");

  const addCategoryHandler = () => {
    const newId = Date.now().toString();
    const newCategory = {
      id: newId,
      title: "",
      priority: 1,
      done: false,
      days: {},
    };

    setCategories((prevValue) => [newCategory, ...prevValue]);
  };

  const handleTitleChange = (e) => {
    const id = e.target.dataset.id;
    const value = e.target.value;
    let repeatedTitles = false; // Had to create this variable because the last condition to setCategories can't rely on repeatedTitleWarning since it's an state

    if (warnings[id]?.repeatedTitleWarning) {
      dispatch({ type: setRepeatedTitleWarning, id: id, value: false });
    }

    if (warnings[id]?.titleWarning) {
      dispatch({ type: setTitleWarning, id: id, value: false });
    }

    setLastModifiedCategoryId(id);

    categories.forEach((category) => {
      if (category.title === value && value) {
        // If the title is empty, it won't be considered a repeated title
        dispatch({
          type: setRepeatedTitleWarning,
          id: id,
          value: true,
        });
        repeatedTitles = true;
      }
    });

    if (!repeatedTitles) {
      setCategories((prevValue) =>
        prevValue.map((category) =>
          category.id === id ? { ...category, title: value } : category
        )
      );
    }
  };

  const handlePriorityChange = (e) => {
    const { id, value } = e.target;
    const numValue = Number(value);

    setLastModifiedCategoryId(id);
    setCategories((prevValue) =>
      prevValue.map((category) =>
        category.id === id ? { ...category, priority: numValue } : category
      )
    );
  };

  const checkDeleteAnswer = (e) => {
    const id = e.target.dataset.delete_id;
    setCategoryToDelete(id);
    setDeleteModal(true);
  };

  const closeDeleteModal = (result) => {
    if (result) {
      setLastModifiedCategoryId(null);

      if (categoryToDelete in warnings) {
        dispatch({ type: removeId, id: categoryToDelete });
      }
    }

    setCategories((prevValue) => (result ? result : prevValue));
    setCategoryToDelete("");
    setDeleteModal(false);
  };

  const handleCloseModal = () => {
    let invalidTitleId = null;

    for (const category of categories) {
      if (!invalidTitleId && !category.title) {
        invalidTitleId = category.id;
        break;
      }
    }

    if (invalidTitleId) {
      dispatch({ type: setTitleWarning, id: invalidTitleId, value: true });
      return;
    }

    closeModal(lastModifiedCategoryId);
  };

  return (
    <>
      <Modal
        {...{
          addCategoryHandler,
          handleCloseModal,
          categories,
          handleTitleChange,
          warnings,
          handlePriorityChange,
          checkDeleteAnswer,
          deleteModal,
        }}
      />
      {deleteModal && (
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          categoryToDeleteId={categoryToDelete}
        />
      )}
    </>
  );
};

export default ModalContainer;
