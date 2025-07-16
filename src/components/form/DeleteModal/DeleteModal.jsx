import "./DeleteModal.css";
import { Button } from "../index";
import { useEffect, useState } from "react";

function DeleteModal({ allCategories, categoryToDeleteId, closeDeleteModal }) {
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const categoryToDelete = allCategories.find(category => category.id === categoryToDeleteId)

    useEffect(() => {
        if (confirmDeletion) {
            const result = allCategories.filter(category => category.id !== categoryToDelete.id);
            closeDeleteModal(result);
        }
    }, [confirmDeletion]);

    return (
        <div className="delete-modal-card has-text-centered">
            <h2 className="subtitle">Do you want to delete {categoryToDelete.title.length ? `'${categoryToDelete.title}'` : "this"} category?</h2>
            <div className="field is-flex is-justify-content-center">
                <div className="control">
                    <Button className="is-primary" onClick={() => setConfirmDeletion(true)} content="Yes" />
                </div>
                <div className="control">
                    <Button className="is-dark is-outlined" onClick={() => closeDeleteModal(null)} content="No" />
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;