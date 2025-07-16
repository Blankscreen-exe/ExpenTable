import { useState } from "react";
import Modal from "./Modal";
import { DeleteModal } from "../index";

const ModalContainer = ({ categories, currentCategoryId, setCategories, closeModal }) => {
  const [lastModifiedCategoryId, setLastModifiedCategoryId] =
    useState(currentCategoryId);
  const [warnThisIdTitle, setTitleWarning] = useState("");
  const [warnThisIdPriority, setPriorityWarning] = useState("");
  const [repeatedTitleWarning, setRepeatedTitleWarning] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState("");

  const addCategoryHandler = () => {
    const lastCategoryId = categories[0]?.id || "id0";
    const lastIdNumber = Number(lastCategoryId.slice(2));
    const newId = `id${lastIdNumber + 1}`;
    const newCategory = {
      id: newId,
      title: "",
      priority: 0,
      done: false,
      days: {},
    };

    setTitleWarning("");
    setPriorityWarning("");
    setCategories((prevValue) => [newCategory, ...prevValue]);
  };

  const handleTitleChange = (e) => {
    const id = e.target.dataset.id;
    const value = e.target.value;
    const changedCategory = categories.find((category) => category.id === id);

    setRepeatedTitleWarning("");

    categories.forEach((category) => {
      if (category.title === value) {
        setRepeatedTitleWarning(changedCategory.id);
      }
    });

    setTitleWarning("");
    setLastModifiedCategoryId(id);
    setCategories((prevValue) =>
      prevValue.map((category) =>
        category.id === id ? { ...category, title: value } : category
      )
    );
  };

  const handlePriorityChange = (e) => {
    const { id, value } = e.target;
    const numValue = Number(value);

    setPriorityWarning("");
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
    }

    setCategories((prevValue) => (result ? result : prevValue));
    setDeleteModal(false);
  };

  const handleCloseModal = () => {
    let invalidTitle = null;
    let invalidPriority = null;

    for (const category of categories) {
      if (!invalidTitle && !category.title) {
        invalidTitle = category.id;
      }

      if (!invalidPriority && !category.priority) {
        invalidPriority = category.id;
      }

      if (invalidTitle && invalidPriority) break;
    }

    if (invalidTitle || invalidPriority) {
      if (invalidTitle) setTitleWarning(invalidTitle);
      if (invalidPriority) setPriorityWarning(invalidPriority);

      return;
    }

    closeModal(categories, lastModifiedCategoryId);
  };

  return (
    <>
      <Modal 
      {...{
        addCategoryHandler,
        handleCloseModal,
        categories,
        handleTitleChange,
        warnThisIdTitle,
        repeatedTitleWarning,
        warnThisIdPriority,
        handlePriorityChange,
        checkDeleteAnswer,
        deleteModal
      }}
      />
      {deleteModal && (
        <DeleteModal
          closeDeleteModal={closeDeleteModal}
          allCategories={categories}
          categoryToDeleteId={categoryToDelete}
        />
      )}
    </>
  );
};

export default ModalContainer;
