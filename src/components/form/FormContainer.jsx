import { useState } from "react";
import { Form, ModalContainer } from "./index";
import { useCategories } from "./FormContext";

const FormContainer = () => {
  const { categories, setCategories } = useCategories();
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0] || null
  );
  const days = selectedCategory?.days || {};

  // Change category when user selects a different one in the dropdown
  const handleSelectChange = (e) => {
    const categorySelected = categories.find(
      (category) => category.title === e.target.value
    );
    setSelectedCategory(categorySelected);
  };

  // Change the priority of the category
  const handlePriorityChange = (e) => {
    const { value } = e.target;

    setCategories((prevValue) =>
      prevValue.map((category) =>
        selectedCategory.id === category.id
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

    setCategories((prevValue) =>
      prevValue.map((category) =>
        selectedCategory.id === category.id
          ? { ...category, days: newDays }
          : category
      )
    );
  };

  // Update the categories state when the modal closes
  const closeModal = (newCategories, modifiedCategoryId) => {
    if (modifiedCategoryId) {
      const category = categories.find(
        (category) => category.id === modifiedCategoryId
      );
      console.log(category);

      setSelectedCategory(category);
    } else {
      setSelectedCategory(newCategories[0] ?? null);
    }

    setCategories(newCategories); // This is unnecessary, we can set the categories directly in the ModalContainer
    setModal(false);
  };

  return (
    <section style={{ position: "relative" }}>
      <div className={`modal-overlay ${modal ? "open" : ""}`} />
      <Form
        {...{
          selectedCategory,
          handleSelectChange,
          handlePriorityChange,
          days,
          handleDaysInputChange,
        }}
        openModal={() => setModal(true)}
      />
      {modal && (
        <ModalContainer
          currentCategoryId={selectedCategory?.id || null}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

export default FormContainer;
