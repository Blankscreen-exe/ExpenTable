import { useState } from "react";
import { useLocalStorage } from "../../customHooks";
import { Form, Modal } from "./index"

const FormContainer = () => {
  const categoriesKey = "categories";
  const [formData, setFormData] = useLocalStorage(categoriesKey, []);
  const [modal, setModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    formData[0]?.id || null
  );
  const selectedCategory = formData.find((c) => c.id === selectedCategoryId);
  const days = selectedCategory?.days || {};
  const priorityValue = selectedCategory?.priority || "";

  // Change category when user selects a different one in the dropdown
  const handleSelectChange = (e) => {
    const categorySelected = formData.find(
      (category) => category.title === e.target.value
    );
    setSelectedCategoryId(categorySelected.id); // Why using the ID when I can use the category directly?
  };

  // Change the priority of the category
  const handlePriorityChange = (e) => {
    const { value } = e.target;

    setFormData((prevValue) =>
      prevValue.map((category) =>
        selectedCategoryId === category.id
          ? { ...category, priority: Number(value) }
          : category
      )
    );
  };

  // Change days state when any input triggers the onChange
  const handleDaysInputChange = (e) => {
    const { name, value } = e.target;
    const day = name.slice(0, 3);
    const property = name.slice(4, name.length);
    const newDays = {
      ...days,
      [day]: {
        ...(days[day] || {}),
        [property]: property === "title" ? value : parseFloat(value),
      },
    };

    setFormData((prevValue) =>
      prevValue.map((category) =>
        selectedCategoryId === category.id
          ? { ...category, days: newDays }
          : category
      )
    );
  };

  // Erase this, and create a context instead
  // Update the formData state when the modal closes
  const closeModal = (newFormData, modifiedCategoryId) => {
    setFormData(newFormData);
    setSelectedCategoryId(modifiedCategoryId ?? newFormData[0]?.id ?? null);
    setModal(false);
  };

  return (
    <section style={{ position: "relative" }}>
      <div className={`modal-overlay ${modal ? "open" : ""}`} />
      <Form 
        {...{
          formData,
          selectedCategory,
          handleSelectChange,
          priorityValue,
          handlePriorityChange,
          days,
          handleDaysInputChange,
        }}
        openModal={() => setModal(true)}
      />
      {modal && (
        <Modal currentCategoryId={selectedCategoryId} closeModal={closeModal} />
      )}
    </section>
  );
};

export default FormContainer;
