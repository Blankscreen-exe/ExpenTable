import { useState } from "react";
import { useLocalStorage } from "../../customHooks";
import { Form, ModalContainer } from "./index";

const FormContainer = () => {
  const categoriesKey = "categories";
  const [formData, setFormData] = useLocalStorage(categoriesKey, []);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    formData[0] || null
  );
  const days = selectedCategory?.days || {};

  // Change category when user selects a different one in the dropdown
  const handleSelectChange = (e) => {
    const categorySelected = formData.find(
      (category) => category.title === e.target.value
    );
    setSelectedCategory(categorySelected); // Why using the ID when I can use the category directly?
  };

  // Change the priority of the category
  const handlePriorityChange = (e) => {
    const { value } = e.target;

    setFormData((prevValue) =>
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

    setFormData((prevValue) =>
      prevValue.map((category) =>
        selectedCategory.id === category.id
          ? { ...category, days: newDays }
          : category
      )
    );
  };

  // Erase this, and create a context instead
  // Update the formData state when the modal closes
  const closeModal = (newFormData, modifiedCategoryId) => {
    if(modifiedCategoryId) {
      const category = formData.find(category => category.id === modifiedCategoryId);
      console.log(category);

      setSelectedCategory(category);
    } else {
      setSelectedCategory(newFormData[0] ?? null);
    }

    setFormData(newFormData);
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
          handlePriorityChange,
          days,
          handleDaysInputChange,
        }}
        openModal={() => setModal(true)}
      />
      {modal && (
        <ModalContainer categories={formData} setCategories={setFormData} currentCategoryId={selectedCategory.id} closeModal={closeModal} />
      )}
    </section>
  );
};

export default FormContainer;
