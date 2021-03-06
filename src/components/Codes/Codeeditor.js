import React, { useState, useEffect } from 'react';

import CodeService from '../../_services/Codeservice';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';
import { ECodeType } from '../../_interfaces/code';

import './codeeditor.scss';

const CodeEditor = (props) => {
    const [loading, setLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [codeTypes, setCodeTypes] = useState(Object.values(ECodeType));
    const [modalStatus, setModalStatus] = useState({ modalShow: '', display: 'none' });
    const codeService = CodeService.instance;

    // didMount
    useEffect(() => {
        MessageBus.listenFor(AppConstants.MSG_OPEN_MODAL, (payload) => {
            if (payload.target === 'codeeditor') {
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
        codeService.updateCode(model);
        closeModal();
    };

    const handleChange = (name, e) => {
        let tmp = Object.assign({}, model);
        tmp[name] = e.target.value;
        setModel(tmp);
    };

    const handleSubmit = () => {};

    if (!model) {
        return null;
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
                    <form className="needs-validation">
                        <div className="modal-content modal-content-codes">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Code {model.id}</h5>
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
                                        Code Type
                                    </label>
                                    <select
                                        className="form-control form-control-sm input-sm dropdown"
                                        id="codetype"
                                        name="codetype"
                                        value={model.codetype}
                                        onChange={(e) => handleChange('codetype', e)}
                                    >
                                        {codeTypes.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="label" htmlFor="title">
                                        Code
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm input-sm dropdown"
                                        id="code"
                                        name="code"
                                        value={model.code}
                                        onChange={(e) => handleChange('code', e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="label" htmlFor="title">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm input-sm"
                                        id="description"
                                        name="description"
                                        value={model.description}
                                        onChange={(e) => handleChange('description', e)}
                                    />
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
    );
};

export default CodeEditor;
