import { useState } from 'react';
import { useLocalStorage } from '../../customHooks';
import appConstants from '../../appConstants';
import { Modal, Input, Select, Button } from "./index";
import "./Form.css";

function Form() {
    const categoriesKey = "categories";
    const { days: weekDays, fullDays: fullWeekDays } = appConstants;
    const [formData, setFormData] = useLocalStorage(categoriesKey, []);
    const [modal, setModal] = useState(false);
    const [selectedCategoryId, setCategoryId] = useState(formData[0]?.id || null);
    
    const selectedCategory = formData.find(c => c.id === selectedCategoryId);
    const days = selectedCategory?.days || {};
    const priorityValue = selectedCategory?.priority || "";

    // Change category when user selects a different one in the dropdown
    const handleSelectChange = (e) => {
        const categorySelected = formData.find(category => category.title === e.target.value);
        setCategoryId(categorySelected.id);
    }

    // Change the priority of the category
    const handlePriorityChange = (e) => {
        const { value } = e.target;

        setFormData(prevValue =>
            prevValue.map((category) =>
                selectedCategoryId === category.id ? {...category, priority: Number(value)} : category
            )
        );
    }

    // Change days state when any input triggers the onChange
    const handleDaysInputChange = (e) => {
        const { name, value } = e.target;
        const day = name.slice(0, 3);
        const property = name.slice(4, name.length);
        const newDays = {
            ...days,
            [day]: {
                ...(days[day] || {}),
                [property]: property === "title" ? value : parseFloat(value)
            }
        }

        setFormData(prevValue => 
            prevValue.map((category) => 
                selectedCategoryId === category.id ? { ...category, days: newDays } : category
            )
        );
    }

    // Update the formData state when the modal closes
    const closeModal = (newFormData, modifiedCategoryId) => {
        setFormData(newFormData);
        setCategoryId(modifiedCategoryId ?? newFormData[0]?.id ?? null);
        setModal(false);
    }

    return (
        <section style={{ position: "relative"}}>
            <div className={`modal-overlay ${modal ? "open" : ""}`}/>
            <div className='is-flex is-flex-direction-column is-align-items-center'>
                {formData.length ?
                    <form className='form'>
                        <div className='field is-grouped is-justify-content-space-between is-flex-wrap-wrap'>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label htmlFor="categories" className='label'>Category:</label>
                                </div>
                                <div className="field-body">
                                    <div className="field has-addons">
                                        <div className='control'>
                                            <div className="select is-primary">
                                                <Select 
                                                    value={selectedCategory.title} 
                                                    onChange={handleSelectChange} 
                                                    name="categories" 
                                                    id="categories-dropdown"
                                                    options={formData.map(item => item.title)} 
                                                />
                                            </div>
                                        </div>
                                        <div className='control'>
                                            <Button
                                                className='is-primary is-outlined'
                                                onClick={() => setModal(true)}
                                                content="Edit"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label htmlFor="priority" className='label'>Priority:</label>
                                </div>
                                <div className="field-body">
                                    <div className="control">
                                        <div className="select is-primary">
                                            <Select 
                                                name="priority" 
                                                id="priority" 
                                                value={priorityValue} 
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
                                        <h2 style={{ marginBottom: "1rem" }} className='subtitle'>{fullWeekDays[index]}</h2>
                                        <div className="field is-grouped is-flex-wrap-wrap">
                                            <div className='field title-input__field'>
                                                <label htmlFor={`${day}-title`} className='label'>Title</label>
                                                <div className="control has-icons-left">
                                                    <Input
                                                        onChange={handleDaysInputChange}
                                                        name={`${day}-title`}
                                                        id={`${day}-title`}
                                                        value={days[day]?.title || ""}
                                                    />
                                                    <span className="icon custom-icon is-left">
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='field allottedTime-input__field'>
                                                <label htmlFor={`${day}-allottedTime`} className='label'>Alloted time</label>
                                                <div className="control has-icons-left">
                                                    <Input
                                                        onChange={handleDaysInputChange}
                                                        type="number" step={0.5}
                                                        name={`${day}-allottedTime`}
                                                        id={`${day}-allotted-time`}
                                                        value={days[day]?.allottedTime || ""}
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
                                )
                            })}
                        </div>
                    </form>
                    :
                    <div style={{ height: "24rem" }} className='is-flex is-flex-direction-column is-align-items-center is-justify-content-center is-row-gap-2'>
                        <h2 className='subtitle has-text-centered'>You still have no categories created.</h2>
                        <Button 
                            className='is-primary is-outlined' 
                            onClick={() => setModal(true)}
                            content="Create a new category"
                        />
                    </div>
                }
            </div>
            {modal && <Modal currentCategoryId={selectedCategoryId} closeModal={closeModal} />}
        </section>
    )
}

export default Form;