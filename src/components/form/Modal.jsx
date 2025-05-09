import React from 'react';

export default function Modal() {
    return (
        <div className='modal-card'>
            <form>
                <div className="field is-horizontal is-align-items-center">
                    <span className='subtitle modal-span'>Categories</span>
                    <div className="control">
                        <button className="button is-primary is-outlined is-radiusless">Add Category</button>
                    </div>
                </div>
                <div className="level">
                    <div className="level-item is-flex-direction-column">
                        <span className='subtitle modal-sub'>Title</span>
                        <div style={{width: "100%"}} className="field">
                            <div className="option">
                                <input type="text" className="input is-primary is-radiusless" />
                            </div>
                        </div>
                        <div style={{width: "100%"}} className="field">
                            <div className="option">
                                <input type="text" className="input is-primary is-radiusless" />
                            </div>
                        </div>
                    </div>
                    <div className="level-item is-flex-direction-column">
                        <span className='subtitle modal-sub'>Priority</span>
                        <div className="field">
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
                        </div>
                        <div className="field">
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
                        </div>
                    </div>
                    <div className="level-item is-flex-direction-column">
                        <span className='subtitle modal-sub'>Actions</span>
                        <div className="field">
                            <div className="control">
                                <button type='button' className="button is-danger is-radiusless">Delete</button>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type='button' className="button is-danger is-radiusless">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}