import React, { useState } from 'react';
import { useLocalStorage } from '../../customHooks';
import Modal from './Modal';

function Form() {
    const categoriesKey = "categories";
    const [formData, setFormData] = useLocalStorage(categoriesKey, []);
    const [modal, setModal] = useState(false);

    // Checks if the category has specific day
    const checkCategoryDay = (day) => {
        formData.forEach(item => {
            const itemDay = item.days[day];
            if (itemDay) {
                return itemDay;
            } else {
                return null;
            }
        })
    }

    // Days state
    const [sunday, setSunday] = useState(() => checkCategoryDay("sun"));
    const [monday, setMonday] = useState(() => checkCategoryDay("mon"));
    const [tuesday, setTuesday] = useState(() => checkCategoryDay("tue"));
    const [wednesday, setWednesday] = useState(() => checkCategoryDay("wed"));
    const [thursday, setThursday] = useState(() => checkCategoryDay("thu"));
    const [friday, setFriday] = useState(() => checkCategoryDay("fri"));
    const [saturday, setSaturday] = useState(() => checkCategoryDay("sat"));

    return (
        <div>
            <form>
                {formData.length ?
                    <div>
                        <div>
                            <label htmlFor="categories">Category:</label>
                            <select name="categories" id="categories-dropdown">
                                {formData.map((item, index) => {
                                    return (<option value={item.title} key={index}>{item.title}</option>);
                                })}
                            </select>
                            <button onClick={() => setModal(true)}>Edit</button>
                            <label htmlFor="priority">Priority:</label>
                            <input type="number" min={1} max={5} />
                        </div>
                        <div>
                            <div>
                                <h2>Sunday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="sunTitle" id="sun-title" value={sunday ? sunday.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="sunAllotedTime" id="sun-alloted-time" value={sunday ? sunday.allotedTime : null} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Monday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="monTitle" id="mon-title" value={monday ? monday.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="monAllotedTime" id="mon-alloted-time" value={monday ? monday.allotedTime : null} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Tuesday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="tueTitle" id="tue-title" value={tuesday ? tuesday.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="tueAllotedTime" id="tue-alloted-time" value={tuesday ? tuesday.allotedTime : null} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Wednesday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="wedTitle" id="wed-title" value={wednesday ? wednesday.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="wedAllotedTime" id="wed-alloted-time" value={wednesday ? wednesday.allotedTime : null} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Thursday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="thuTitle" id="thu-title" value={thursday ? thursday.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="thuAllotedTime" id="thu-alloted-time" value={thursday ? thursday.allotedTime : null} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Friday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="friTitle" id="fri-title" value={friday ? friday.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="friAllotedTime" id="fri-alloted-time" value={friday ? friday.allotedTime : null} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2>Saturday</h2>
                                <div>
                                    <label>
                                        Title
                                        <input type="text" name="satTitle" id="sat-title" value={saturday ? saturday.title : ""} />
                                    </label>
                                    <label>
                                        Alloted time
                                        <input type="number" step={0.5} name="satAllotedTime" id="sat-alloted-time" value={saturday ? saturday.allotedTime : null} />
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