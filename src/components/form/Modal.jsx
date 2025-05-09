import React from 'react';

export default function Modal() {
    return (
        <div className='form-modal-card'>
            <form className='modal-content'>
                <div style={{ marginBottom: "2rem" }} className="is-display-flex is-justify-content-space-between is-column-gap-8">
                    <div className='field is-display-flex is-align-items-center is-flex-wrap-wrap is-row-gap-1'>
                        <span className='subtitle modal-span'>Categories</span>
                        <div className="control modal-control">
                            <button type='button' className="button is-primary is-outlined is-radiusless">Add Category</button>
                        </div>
                    </div>
                    <div className="control has-icons">
                        <button>
                            <span className="icon is-left">
                                <i class="fa-solid fa-xmark fa-lg"></i>
                            </span>
                        </button>
                    </div>
                </div>
                <span style={{ display: "inline-block", marginBottom: "1rem" }} className='has-text-primary'>Title / Priority / Action</span>
                <div className="field is-grouped is-flex-wrap-wrap">
                    <div className="control">
                        <input type="text" placeholder='Title' className="input is-primary is-radiusless" />
                    </div>
                    <div className="control">
                        <div className="select is-primary">
                            <select name="priority" id="priority" className='is-radiusless'>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-danger is-radiusless">Delete</button>
                    </div>
                </div>
            </form>
        </div>
    )
}