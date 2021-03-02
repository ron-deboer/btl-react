import React, { useState, useEffect } from 'react';

import UserService from '../../_services/Userservice';

import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './usereditor.scss';

const UserEditor = (props) => {
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [roles, setRoles] = useState(['admin', 'user']);
    const [modalStatus, setModalStatus] = useState({ modalShow: '', display: 'none' });
    const userService = UserService.instance;

    // didMount
    useEffect(() => {
        MessageBus.listenFor(AppConstants.MSG_OPEN_MODAL, (payload) => {
            if (payload.target === 'usereditor') {
                setModel(payload.data);
                if (payload.data !== null) {
                    openModal();
                } else {
                    closeModal();
                }
            }
        });
        setLoading(new Date().getTime());
    }, []);

    const openModal = () => {
        setModalStatus({
            modalShow: 'show',
            display: 'block',
        });
    };

    const closeModal = () => {
        setModalStatus({
            modalShow: '',
            display: 'none',
        });
    };

    const handleSave = () => {
        userService.updateUser(model);
        closeModal();
    };

    const handleChange = (name, e) => {
        let tmp = Object.assign({}, model);
        tmp[name] = e.target.value;
        setModel(tmp);
    };

    const handleSubmit = () => {};

    if (model === null) {
        return false;
    }
    return (
        <div className="modale" aria-hidden="true" style={{ display: modalStatus.display }}>
            <div
                className={'modal fade ' + modalStatus.modalShow}
                id="modalItem"
                tabIndex="-1"
                role="dialog"
                aria-hidden="true"
                style={{ display: modalStatus.display }}
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form className="needs-validation">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit User {model.id}</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={closeModal}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label className="label" htmlFor="username">
                                            User Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm input-sm dropdown"
                                            id="username"
                                            name="username"
                                            value={model.username}
                                            onChange={(e) => handleChange('username', e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="name">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm input-sm"
                                            id="name"
                                            name="name"
                                            value={model.name}
                                            onChange={(e) => handleChange('name', e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="email">
                                            Email
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm input-sm"
                                            id="email"
                                            name="email"
                                            value={model.email}
                                            onChange={(e) => handleChange('email', e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="role">
                                            Role
                                        </label>
                                        <select
                                            className="form-control form-control-sm input-sm dropdown"
                                            id="role"
                                            name="role"
                                            value={model.role}
                                            onChange={(e) => handleChange('role', e)}
                                        >
                                            {roles.map((c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSave}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserEditor;
