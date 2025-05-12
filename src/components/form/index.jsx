import React, { useState } from 'react';
import { useLocalStorage } from '../../customHooks';
import Modal from './Modal';
import appConstants from '../../appConstants';

function Form() {
    const categoriesKey = "categories";
    const [formData, setFormData] = useLocalStorage(categoriesKey, []);
    const [modal, setModal] = useState(false);
    const [selectedCategory, setCategory] = useState(formData[0]);
    const [days, setDays] = useState(selectedCategory?.days || {});
    const [priorityValue, setPriority] = useState(selectedCategory?.priority || "");

    // All days of the week
    const weekDays = appConstants.days;
    const fullWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Change category when user selects a different one in the dropdown
    const handleSelectChange = (e) => {
        const categorySelected = formData.find(category => category.title === e.target.value);
        setCategory(categorySelected);
        setDays(categorySelected.days);
        setPriority(categorySelected.priority);
    }

    // Change days state when any input triggers the onChange
    const handleDaysInputChange = (e) => {
        const { name, value } = e.target;
        const day = name.slice(0, 3);
        const property = name.slice(4, name.length);

        if (property === "title") {
            const newDays = {
                ...days,
                [day]: {
                    ...(days[day] || {}),
                    title: value
                }
            }

            const categoryId = selectedCategory.id;

            setDays(newDays);
            setCategory(prevValue => ({...prevValue, days: newDays}));
            setFormData(prevValue => 
                prevValue.map((category) => 
                    categoryId === category.id ? { ...category, days: newDays } : category
                )
            );
        } else if (property === "allottedTime") {
            // Resolver esto igual que con lo de title
            const numValue = parseFloat(value);
            setDays(prevValue => ({ ...prevValue, [day]: { ...(prevValue[day] || {}), allottedTime: numValue } }));
        }
    }

    // Update the formData state when the modal closes
    const closeModal = (newFormData) => {
        setFormData(newFormData);
        setModal(false);
    }

    return (
        <section style={{ paddingInline: "2rem", position: "relative"}}>
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
                                                <select className='is-radiusless' onChange={handleSelectChange} name="categories" id="categories-dropdown">
                                                    {formData.map((item, index) => {
                                                        return (<option value={item.title} key={index}>{item.title}</option>);
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='control'>
                                            <button
                                                type='button'
                                                className='button is-primary is-radiusless is-outlined'
                                                onClick={() => setModal(true)}
                                            >
                                                Edit
                                            </button>
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
                                            <select name="priority" id="priority" className='is-radiusless' value={priorityValue} onChange={(e) => setPriority(e.target.value)}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
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
                                                    <input
                                                        onChange={handleDaysInputChange}
                                                        type="text"
                                                        name={`${day}-title`}
                                                        id={`${day}-title`}
                                                        value={days[day]?.title || ""}
                                                        className='input is-primary is-radiusless'
                                                    />
                                                    <span className="icon custom-icon is-left">
                                                        <i className="fa-regular fa-pen-to-square"></i>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='field allottedTime-input__field'>
                                                <label htmlFor={`${day}-allottedTime`} className='label'>Alloted time</label>
                                                <div className="control has-icons-left">
                                                    <input
                                                        onChange={handleDaysInputChange}
                                                        type="number" step={0.5}
                                                        name={`${day}-allottedTime`}
                                                        id={`${day}-allotted-time`}
                                                        value={days[day]?.allottedTime || ""}
                                                        className='input is-primary is-radiusless'
                                                    />
                                                    <span className="icon custom-icon is-left">
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
                    <div className='is-flex is-flex-direction-column is-align-items-center'>
                        <h2 className='subtitle'>You still have no categories created.</h2>
                        <button type='button' className='button is-primary is-outlined is-radiusless' onClick={() => setModal(true)}>Create a new category</button>
                    </div>
                }
            </div>
            {modal && <Modal closeModal={closeModal} />}
        </section>
    )
}

export default Form