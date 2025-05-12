import React, { useState } from 'react';
import { useLocalStorage } from '../../customHooks';

export default function Modal(props) {
    const categoriesKey = "categories";
    const [categories, setCategories] = useLocalStorage(categoriesKey, []);
    const [lastModifiedCategoryId, setCategoryId] = useState(props.currentCategoryId);

    const addCategoryHandler = () => {
        const newId = `id${categories.length + 1}`;
        const newCategory = {
            id: newId,
            title: "",
            priority: 0,
            done: false,
            days: {}
        }

        setCategories(prevValue => [newCategory, ...prevValue]);
    }

    const handleTitleChange = (e) => {
        const id = e.target.dataset.id;
        const value = e.target.value;

        setCategoryId(id);
        setCategories(prevValue =>
            prevValue.map(category =>
                category.id === id ? { ...category, title: value } : category
            )
        );
    }

    const handlePriorityChange = (e) => {
        const { id, value } = e.target;
        const numValue = Number(value);

        setCategoryId(id);
        setCategories(prevValue =>
            prevValue.map(category =>
                category.id === id
                    ? { ...category, priority: numValue }
                    : category
            )
        );
    }

    const deleteCategory = (e) => {
        const id = e.target.dataset.delete_id;
        console.log(id);
        
        setCategoryId(prevValue => prevValue === id ? null : prevValue);
        setCategories(prevValue => prevValue.filter(category => id !== category.id));
    }

    return (
        <div className='form-modal-card'>
            <form className='modal-content'>
                <div style={categories.length > 0 ? { marginBottom: '1.5rem' } : {} } className="is-display-flex is-justify-content-space-between is-column-gap-8">
                    <div style={{ marginBottom: "0" }} className='field is-display-flex is-align-items-center is-flex-wrap-wrap is-row-gap-1.5'>
                        <span className='subtitle modal-span'>Categories</span>
                        <div className="control modal-control">
                            <button
                                type='button'
                                onClick={addCategoryHandler}
                                className="button is-primary is-outlined is-radiusless">
                                Add Category
                            </button>
                        </div>
                    </div>
                    <div className="control has-icons">
                        <button type='button' onClick={() => props.closeModal(categories, lastModifiedCategoryId)}>
                            <span className="icon is-left">
                                <i className="fa-solid fa-xmark fa-lg"></i>
                            </span>
                        </button>
                    </div>
                </div>
                {categories.map((category, index) => {
                    return (
                        <div key={category.id}>
                            <div className="custom-field field is-grouped is-column-gap-2 is-flex-wrap-wrap">
                                <div className="control custom-control">
                                    <input
                                        name={`title-${index}`}
                                        id={`title-${index}`}
                                        data-id={category.id}
                                        onChange={handleTitleChange}
                                        type="text"
                                        placeholder='Title'
                                        className="input is-primary is-radiusless"
                                        value={category.title}
                                    />
                                </div>
                                <div className="control">
                                    <div className="select is-primary">
                                        <select onChange={handlePriorityChange} name={`priority-${index}`} id={category.id ? category.id : ""} className='is-radiusless' value={category?.priority || ""}>
                                            <option value="" disabled hidden>Priority</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="control">
                                    <button data-delete_id={category.id} onClick={deleteCategory} type='button' className="button is-danger is-radiusless">Delete</button>
                                </div>
                            </div>
                            {categories.length - 1 !== index && <hr style={{margin: "0 0 1rem 0"}} />}
                        </div>
                    )
                })}
            </form>
        </div>
    )
}