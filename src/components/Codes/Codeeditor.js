import React, { Component } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';
import UserService from '../../_services/Userservice';

import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import { ECodeType } from '../../_interfaces/code';

import './codeeditor.scss';

class CodeEditor extends Component {
    state = {
        itemService: ItemService.instance,
        codeService: CodeService.instance,
        userService: UserService.instance,
        model: null,
        modalShow: '',
        display: 'none',
    };
    codeTypes = [];

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        MessageBus.listenFor(AppConstants.MSG_OPEN_MODAL, (payload) => {
            if (payload.target === 'codeeditor') {
                this.setState({ model: payload.data });
                if (payload.data !== null) {
                    this.openModal();
                } else {
                    this.closeModal();
                }
            }
        });
        this.codeTypes = Object.values(ECodeType);
    }

    openModal() {
        this.setState({
            modalShow: 'show',
            display: 'block',
        });
    }

    closeModal() {
        this.setState({
            modalShow: '',
            display: 'none',
        });
    }

    getSelectOptions(key, codeType) {
        if (codeType !== 'ASSIGNED') {
            return this.codes
                .filter((x) => x.codetype === codeType)
                .map((x) => {
                    return {
                        key: codeType + '_' + x.id,
                        code: x.code,
                    };
                });
        }
        return this.users.map((x) => {
            return {
                key: codeType + '_' + x.id,
                code: x.username,
            };
        });
    }

    handleSave() {
        this.state.codeService.updateCode(this.state.model);
        this.closeModal();
    }

    handleChange(name, e) {
        let model = this.state.model;
        model[name] = e.target.value;
        this.setState({ model: model });
    }

    handleSubmit() {}

    render() {
        if (!this.state.model) {
            return null;
        }
        return (
            <div className="modale" aria-hidden="true" style={{ display: this.state.display }}>
                <div
                    className={'modal fade ' + this.state.modalShow}
                    id="modalItem"
                    tabIndex="-1"
                    role="dialog"
                    aria-hidden="true"
                    style={{ display: this.state.display }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <form className="needs-validation">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Code {this.state.model.id}</h5>
                                        <button
                                            type="button"
                                            className="close"
                                            data-dismiss="modal"
                                            aria-label="Close"
                                            onClick={this.closeModal}
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
                                                value={this.state.model.code}
                                                onChange={(e) => this.handleChange('codetype', e)}
                                            >
                                                {this.codeTypes.map((c) => (
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
                                                value={this.state.model.code}
                                                onChange={(e) => this.handleChange('code', e)}
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
                                                value={this.state.model.description}
                                                onChange={(e) => this.handleChange('description', e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={this.closeModal}
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={this.handleSave}
                                        >
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
    }
}

export default CodeEditor;
