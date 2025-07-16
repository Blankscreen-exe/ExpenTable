import { useState } from 'react';
import { useLocalStorage } from '../../../customHooks';
import { Input, Select, Button, DeleteModal } from "../index";
import "./Modal.css";

function Modal({ currentCategoryId, closeModal, categories, setCategories }) {
    const [lastModifiedCategoryId, setLastModifiedCategoryId] = useState(currentCategoryId);
    const [warnThisIdTitle, setTitleWarning] = useState("");
    const [warnThisIdPriority, setPriorityWarning] = useState("");
    const [repeatedTitleWarning, setRepeatedTitleWarning] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState("");

    const addCategoryHandler = () => {
        const lastCategoryId = categories[0]?.id || "id0";
        const lastIdNumber = Number(lastCategoryId.slice(2));
        const newId = `id${lastIdNumber + 1}`;
        const newCategory = {
            id: newId,
            title: "",
            priority: 0,
            done: false,
            days: {}
        }

        setTitleWarning("");
        setPriorityWarning("");
        setCategories(prevValue => [newCategory, ...prevValue]);
    }

    const handleTitleChange = (e) => {
        const id = e.target.dataset.id;
        const value = e.target.value;
        const changedCategory = categories.find(category => category.id === id);

        setRepeatedTitleWarning("");

        categories.forEach(category => {
            if (category.title === value) {
                setRepeatedTitleWarning(changedCategory.id);
            }
        });

        setTitleWarning("");
        setLastModifiedCategoryId(id);
        setCategories(prevValue =>
            prevValue.map(category =>
                category.id === id ? { ...category, title: value } : category
            )
        );
    };

    const handlePriorityChange = (e) => {
        const { id, value } = e.target;
        const numValue = Number(value);

        setPriorityWarning("");
        setLastModifiedCategoryId(id);
        setCategories(prevValue =>
            prevValue.map(category =>
                category.id === id
                    ? { ...category, priority: numValue }
                    : category
            )
        );
    }

    const checkDeleteAnswer = (e) => {
        const id = e.target.dataset.delete_id;
        setCategoryToDelete(id);
        setDeleteModal(true);
    }

    const closeDeleteModal = (result) => {
        if (result) {
            setLastModifiedCategoryId(null);
        }

        setCategories(prevValue => result ? result : prevValue);
        setDeleteModal(false);
    }

    const handleCloseModal = () => {
        let invalidTitle = null;
        let invalidPriority = null;

        for (const category of categories) {
            if (!invalidTitle && !category.title) {
                invalidTitle = category.id;
            }

            if (!invalidPriority && !category.priority) {
                invalidPriority = category.id;
            }

            if (invalidTitle && invalidPriority) break;
        }

        if (invalidTitle || invalidPriority) {
            if (invalidTitle) setTitleWarning(invalidTitle);
            if (invalidPriority) setPriorityWarning(invalidPriority);

            return;
        }

        closeModal(categories, lastModifiedCategoryId);
    }

    return (
        <>
            <div className='form-modal-card'>
                <div className={`modal-overlay ${deleteModal ? "open" : ""}`}/>
                <form className='modal-content'>
                    <div style={categories.length > 0 ? { marginBottom: '1.5rem' } : {}} className="is-display-flex is-justify-content-space-between is-column-gap-8">
                        <div style={{ marginBottom: "0" }} className='field is-display-flex is-align-items-center is-flex-wrap-wrap is-row-gap-1.5'>
                            <span className='subtitle modal-span'>Categories</span>
                            <div className="control modal-control">
                                <Button
                                    onClick={addCategoryHandler}
                                    className="is-primary is-outlined"
                                    content="Add Category"
                                />
                            </div>
                        </div>
                        <div className="control has-icons">
                            <Button
                                onClick={handleCloseModal}
                                content={<span className="icon is-left"><i className="fa-solid fa-xmark fa-lg"></i></span>}
                                className='no-border no-hover'
                            />
                        </div>
                    </div>
                    {categories.map((category, index) => {
                        return (
                            <div key={category.id}>
                                <div className="custom-field field is-grouped is-column-gap-2 is-flex-wrap-wrap">
                                    <div className="control custom-control">
                                        <Input
                                            name={`title-${index}`}
                                            id={`title-${index}`}
                                            data-id={category.id}
                                            onChange={handleTitleChange}
                                            placeholder='Title'
                                            value={category.title}
                                            className={warnThisIdTitle === category.id || repeatedTitleWarning === category.id ? 'is-danger warning-animation' : ''}
                                        />
                                        <span className={`has-text-danger ${warnThisIdTitle === category.id ? "is-display-block" : "is-display-none"}`}>Please enter a title!</span>
                                        <span className={`has-text-danger ${repeatedTitleWarning === category.id ? "is-display-block" : "is-display-none"}`}>Cannot have repeated titles!</span>
                                    </div>
                                    <div className="control">
                                        <div className={warnThisIdPriority === category.id ? 'select is-danger warning-animation' : 'select is-primary'}>
                                            <Select
                                                onChange={handlePriorityChange}
                                                name={`priority-${index}`}
                                                id={category.id ? category.id : ""}
                                                value={category?.priority || ""}
                                                options={[1, 2, 3, 4, 5]}
                                                placeholder="Priority"
                                            />
                                        </div>
                                        <span className={`has-text-danger ${warnThisIdPriority === category.id ? "is-display-block" : "is-display-none"}`}>Please enter a priority!</span>
                                    </div>
                                    <div className="control">
                                        <Button
                                            data-delete_id={category.id}
                                            onClick={checkDeleteAnswer}
                                            className="is-danger"
                                            content="Delete"
                                        />
                                    </div>
                                </div>
                                {categories.length - 1 !== index && <hr style={{ margin: "1rem 0" }} />}
                            </div>
                        )
                    })}
                </form>
            </div>
            {deleteModal && <DeleteModal closeDeleteModal={closeDeleteModal} allCategories={categories} categoryToDeleteId={categoryToDelete} />}
        </>
    )
}

export default Modal;