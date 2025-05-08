import React, { useState } from 'react';
import { useLocalStorage } from '../../customHooks';
import Modal from './Modal';
import tableData from '../../data/table.json';
import appConstants from '../../appConstants';

function Form() {
    const categoriesKey = "categories";
    // const [formData, setFormData] = useLocalStorage(categoriesKey, []);
    const formData = tableData;
    const [modal, setModal] = useState(false);
    const [selectedCategory, setCategory] = useState(formData[0]);
    const [days, setDays] = useState(selectedCategory?.days || {});
    const [priorityValue, setPriority] = useState(selectedCategory?.priority || "");

    console.log(priorityValue);

    // All days of the week
    const weekDays = appConstants.days;
    const fullWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Styles for the form
    const formStyles = {
        border: "1px solid rgb(0, 209, 178)",
        padding: "2rem",
    }

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
            setDays(prevValue => ({ ...prevValue, [day]: { ...(prevValue[day] || {}), title: value } }));
        } else if (property === "allottedTime") {
            setDays(prevValue => ({ ...prevValue, [day]: { ...(prevValue[day] || {}), allottedTime: value } }));
        }
    }

    return (
        <section>
            <div className='is-flex is-flex-direction-column is-align-items-center'>
                {formData.length ?
                    <form style={formStyles}>
                        <div style={{ marginBottom: "1rem" }} className='is-flex is-justify-content-center'>
                            <div className='field is-grouped'>
                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label htmlFor="categories" className='label'>Category:</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field has-addons">
                                            <div className='control select is-primary'>
                                                <select className='is-radiusless' onChange={handleSelectChange} name="categories" id="categories-dropdown">
                                                    {formData.map((item, index) => {
                                                        return (<option value={item.title} key={index}>{item.title}</option>);
                                                    })}
                                                </select>
                                            </div>
                                            <div className='control'>
                                                <button
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
                                            <input
                                                onChange={(e) => setPriority(e.target.value)}
                                                type="number"
                                                min={1}
                                                max={5}
                                                value={priorityValue}
                                                className='input is-primary is-radiusless'
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
                                        <h2 className='subtitle'>{fullWeekDays[index]}</h2>
                                        <div className="field is-grouped is-justify-content-space-between">
                                            <div className='field'>
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
                                            <div className='field'>
                                                <label htmlFor={`${day}-allotedTime`} className='label'>Alloted time</label>
                                                <div className="control has-icons-left">
                                                    <input
                                                        onChange={handleDaysInputChange}
                                                        type="number" step={0.5}
                                                        name={`${day}-allotedTime`}
                                                        id={`${day}-alloted-time`}
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
                        <button className='button is-primary is-outlined' onClick={() => setModal(true)}>Create a new category</button>
                    </div>
                }
            </div>
            {modal && <Modal />}
        </section>
    )
}

export default Form