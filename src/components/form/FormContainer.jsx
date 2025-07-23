import { useState } from "react";
import { Form, ModalContainer } from "./index";
import { useCategories } from "./FormContext";

const FormContainer = () => {
  const { categories, setCategories } = useCategories();
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0] || null
  );

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
    console.log(value);

    setCategories((prevValue) =>
      prevValue.map((category) =>
        selectedCategory.id === category.id
          ? { ...category, priority: Number(value) }
          : category
      )
    );

    // This is just for rendering purpose, because we are using this in the Form component to render the priority
    setSelectedCategory((prevValue) => ({
      ...prevValue,
      priority: Number(value),
    }));
  };

  // Change days state when any input triggers the onChange
  const handleDaysInputChange = (e) => {
    const { name, value } = e.target;
    const day = name.slice(0, 3);
    const property = name.slice(4, name.length);
    const newDays = {
      ...selectedCategory.days,
      [day]: {
        ...(selectedCategory.days[day] || {}),
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

    // This is just for rendering purpose, because we are using this in the Form component to render the input value
    setSelectedCategory((prevValue) => ({
      ...prevValue,
      days: newDays,
    }));
  };

  // Update the categories state when the modal closes
  const closeModal = (modifiedCategoryId) => {
    if (modifiedCategoryId) {
      const category = categories.find(
        (category) => category.id === modifiedCategoryId
      );

      setSelectedCategory(category);
    } else {
      setSelectedCategory(categories[0] ?? null);
    }

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
