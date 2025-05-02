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
    const [days, setDays] = useState(selectedCategory.days);
    const [priorityValue, setPriority] = useState(selectedCategory.priority)

    // All days of the week
    const weekDays = appConstants.days;
    const fullWeekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Checks if the category has specific day
    // const checkCategoryDay = (day) => {
    //     const itemDay = selectedCategory.days[day];
    //     if (itemDay) {
    //         return itemDay;
    //     } else {
    //         return null;
    //     }
    // }

    // Change category when user selects a different one in the dropdown
    const handleSelectChange = (e) => {
        const categorySelected = formData.find(category => category.title === e.target.value);
        setCategory(categorySelected);
        setDays(categorySelected.days);
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

    // Days state
    // const [sunday, setSunday] = useState(() => checkCategoryDay("sun"));
    // const [monday, setMonday] = useState(() => checkCategoryDay("mon"));
    // const [tuesday, setTuesday] = useState(() => checkCategoryDay("tue"));
    // const [wednesday, setWednesday] = useState(() => checkCategoryDay("wed"));
    // const [thursday, setThursday] = useState(() => checkCategoryDay("thu"));
    // const [friday, setFriday] = useState(() => checkCategoryDay("fri"));
    // const [saturday, setSaturday] = useState(() => checkCategoryDay("sat"));

    return (
        <div>
            <form>
                {formData.length ?
                    <div>
                        <div>
                            <label htmlFor="categories">Category:</label>
                            <select onChange={handleSelectChange} name="categories" id="categories-dropdown">
                                {formData.map((item, index) => {
                                    return (<option value={item.title} key={index}>{item.title}</option>);
                                })}
                            </select>
                            <button onClick={() => setModal(true)}>Edit</button>
                            <label htmlFor="priority">Priority:</label>
                            <input onChange={(e) => setPriority(e.target.value)} type="number" min={1} max={5} value={priorityValue} />
                        </div>
                        {weekDays.map((day, index) => {
                            return (
                                <div key={day}>
                                    <h2>{fullWeekDays[index]}</h2>
                                    <div>
                                        <label>
                                            Title
                                            <input onChange={handleDaysInputChange} type="text" name={`${day}-title`} id={`${day}-title`} value={days[day]?.title || ""} />
                                        </label>
                                        <label>
                                            Alloted time
                                            <input onChange={handleDaysInputChange} type="number" step={0.5} name={`${day}-allotedTime`} id={`${day}-alloted-time`} value={days[day]?.allottedTime || ""} />
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                        {/* <div>
                            <div>
                                <h2>Sunday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="sun-title" id="sun-title" value={days?.sun?.title || ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="sun-allottedTime" id="sun-alloted-time" value={days?.sun?.allottedTime || ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Monday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="mon-title" id="mon-title" value={days?.mon?.title || ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="mon-allottedTime" id="mon-alloted-time" value={days?.mon?.allottedTime || ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Tuesday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="tue-title" id="tue-title" value={days?.tue?.title || ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="tue-allottedTime" id="tue-alloted-time" value={days?.tue?.allottedTime || ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Wednesday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="wed-title" id="wed-title" value={days?.wed?.title || ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="wed-allottedTime" id="wed-alloted-time" value={days?.wed?.allottedTime || ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Thursday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="thu-title" id="thu-title" value={days?.thu?.title || ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="thu-allottedTime" id="thu-alloted-time" value={days?.thu?.allottedTime || ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Friday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="fri-title" id="fri-title" value={days?.fri?.title || ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="fri-allottedTime" id="fri-alloted-time" value={days?.fri?.allottedTime || ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Saturday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="sat-title" id="sat-title" value={days?.sat?.title || ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="sat-allottedTime" id="sat-alloted-time" value={days?.sat?.allottedTime || ""} />
                                    </label>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    :
                    <div>
                        <h2>You still have no categories created.</h2>
                        <button onClick={() => setModal(true)}>Create a new category</button>
                    </div>
                }
            </form>
            {modal && <Modal />}
        </div>
    )
}

export default Form