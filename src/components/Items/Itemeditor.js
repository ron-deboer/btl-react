import React, { useState, useEffect } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';
import UserService from '../../_services/Userservice';

import CodeSelector from '../CodeSelector/CodeSelector';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './itemeditor.scss';

const ItemEditor = (props) => {
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [modalStatus, setModalStatus] = useState({ modalShow: '', display: 'none' });
    const [codes, setCodes] = useState([]);
    const [users, setUsers] = useState([]);
    const itemService = ItemService.instance;
    const codeService = CodeService.instance;
    const userService = UserService.instance;

    // didMount
    useEffect(() => {
        MessageBus.listenFor(AppConstants.MSG_OPEN_MODAL, (payload) => {
            if (payload.target === 'itemeditor') {
                setModel(payload.data);
                if (payload.data !== null) {
                    openModal();
                } else {
                    closeModal();
                }
            }
        });
        codeService.getAll().then((resp) => {
            setCodes(resp);
        });
        userService.getAll().then((resp) => {
            setUsers(resp);
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

    const getSelectOptions = (key, codeType) => {
        if (codeType !== 'ASSIGNED') {
            let codelist = codes
                .filter((x) => x.codetype === codeType)
                .map((x) => {
                    return {
                        key: codeType + '_' + x.id,
                        code: x.code,
                    };
                });
            codelist.unshift({ key: codeType + '_0', code: '' });
            return codelist;
        }
        let userlist = users.map((x) => {
            return {
                key: codeType + '_' + x.id,
                code: x.username,
            };
        });
        userlist.unshift({ key: codeType + '_0', code: '' });
        return userlist;
    };

    const handleSave = () => {
        const error = validate();
        if (error !== '') {
            alert(error);
            return;
        }

        let promise = null;
        if (model.id > 0) {
            promise = itemService.updateItem(model);
        } else {
            promise = itemService.insertItem(model);
        }
        promise.then((resp) => {
            const payload = {
                target: 'itemsandcodes,itemlist',
                data: model,
            };
            MessageBus.emit(AppConstants.MSG_REFRESH_DATA, payload);
            closeModal();
        });
    };

    const validate = () => {
        if (model.title === '') {
            return 'You must enter a title';
        }
        if (model.boardcode === '') {
            return 'You must enter a boardcode';
        }
        return '';
    };

    const handleChange = (name, e) => {
        let tmp = Object.assign({}, model);
        tmp[name] = e.target.value;
        setModel(tmp);
    };

    if (!model) {
        return null;
    }
    const title = model.id === 0 ? 'Create New Item' : 'Edit Item ' + model.id;
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
                                    <h5 className="modal-title">{title}</h5>
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
                                        <label className="label" htmlFor="title">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm input-sm"
                                            id="title"
                                            name="title"
                                            value={model.title}
                                            onChange={(e) => handleChange('title', e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="form-control form-control-sm"
                                            id="description"
                                            name="description"
                                            required
                                            minLength="4"
                                            value={model.description}
                                            onChange={(e) => handleChange('description', e)}
                                        ></textarea>
                                    </div>
                                    <div className="controlrow">
                                        <div className="form-group dropdown">
                                            <div className="caption">Kanban Board</div>
                                            <CodeSelector
                                                name="boardcode"
                                                value={model.boardcode}
                                                options={getSelectOptions('id', 'BOARD')}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group dropdown">
                                            <div className="caption">Project</div>
                                            <CodeSelector
                                                name="projectcode"
                                                value={model.projectcode}
                                                options={getSelectOptions('id', 'PROJECT')}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group dropdown">
                                            <div className="caption">Priority</div>
                                            <CodeSelector
                                                name="prioritycode"
                                                value={model.prioritycode}
                                                options={getSelectOptions('id', 'PRIORITY')}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group dropdown">
                                            <div className="caption">Size</div>
                                            <CodeSelector
                                                name="sizecode"
                                                value={model.sizecode}
                                                options={getSelectOptions('id', 'SIZE')}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group dropdown">
                                            <div className="caption">Status</div>
                                            <CodeSelector
                                                name="statuscode"
                                                value={model.statuscode}
                                                options={getSelectOptions('id', 'STATUS')}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group dropdown">
                                            <div className="caption">Assigned To</div>
                                            <CodeSelector
                                                name="assignedtouser"
                                                value={model.assignedtouser}
                                                options={getSelectOptions('id', 'ASSIGNED')}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="comments">
                                            Comments
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="form-control form-control-sm input-sm"
                                            id="comments"
                                            name="comments"
                                            value={model.comments}
                                            onChange={(e) => handleChange('comments', e)}
                                        ></textarea>
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

export default ItemEditor;
