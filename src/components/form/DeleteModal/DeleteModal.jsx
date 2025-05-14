import "./DeleteModal.css";
import { Button } from "../index";
import { useState } from "react";

function DeleteModal(props) {
    const [confirmDeletion, setConfirmDeletion] = useState(false);
    const categoryToDelete = props.allCategories.find(category => category.id === props.categoryToDeleteId)

    if (confirmDeletion) {
        const result = props.allCategories.filter(category => category.id !== categoryToDelete.id);
        props.closeDeleteModal(result);
    }

    return (
        <div className="delete-modal-card has-text-centered">
            <h2 className="subtitle">Do you want to delete '{categoryToDelete.title}' category?</h2>
            <div className="field is-flex is-justify-content-center is-column-gap-8">
                <div className="control">
                    <Button className="is-primary" onClick={() => setConfirmDeletion(true)} content="Yes" />
                </div>
                <div className="control">
                    <Button className="is-dark is-outlined"  onClick={() => props.closeDeleteModal(null)} content="No" />
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;