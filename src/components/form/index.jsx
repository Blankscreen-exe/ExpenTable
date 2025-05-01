import React, { useState } from 'react';
import { useLocalStorage } from '../../customHooks';
import Modal from './Modal';
import tableData from '../../data/table.json';

function Form() {
    const categoriesKey = "categories";
    // const [formData, setFormData] = useLocalStorage(categoriesKey, []);
    const formData = tableData;
    const [modal, setModal] = useState(false);
    const [selectedCategory, setCategory] = useState(formData[0]);
    const [days, setDays] = useState(selectedCategory.days);

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
        console.log(name.slice(0, 3));
        setDays(prevValue => ({ ...prevValue, [name]: value }));
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
            <form onChange={handleDaysInputChange}>
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
                            <input type="number" min={1} max={5} value={selectedCategory.priority} />
                        </div>
                        <div>
                            <div>
                                <h2>Sunday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="sunTitle" id="sun-title" value={days.sun ? days.sun.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="sunAllottedTime" id="sun-alloted-time" value={days.sun ? days.sun.allottedTime : ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Monday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="monTitle" id="mon-title" value={days.mon ? days.mon.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="monAllottedTime" id="mon-alloted-time" value={days.mon ? days.mon.allottedTime : ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Tuesday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="tueTitle" id="tue-title" value={days.tue ? days.tue.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="tueAllottedTime" id="tue-alloted-time" value={days.tue ? days.tue.allottedTime : ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Wednesday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="wedTitle" id="wed-title" value={days.wed ? days.wed.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="wedAllottedTime" id="wed-alloted-time" value={days.wed ? days.wed.allottedTime : ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Thursday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="thuTitle" id="thu-title" value={days.thu ? days.thu.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="thuAllottedTime" id="thu-alloted-time" value={days.thu ? days.thu.allottedTime : ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Friday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="friTitle" id="fri-title" value={days.fri ? days.fri.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="friAllottedTime" id="fri-alloted-time" value={days.fri ? days.fri.allottedTime : ""} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Saturday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="satTitle" id="sat-title" value={days.sat ? days.sat.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="satAllottedTime" id="sat-alloted-time" value={days.sat ? days.sat.allottedTime : ""} />
                                    </label>
                                </div>
                            </div>
                        </div>
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