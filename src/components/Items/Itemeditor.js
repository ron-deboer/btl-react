import React, { Component } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';
import UserService from '../../_services/Userservice';

import CodeSelector from '../CodeSelector/CodeSelector';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './itemeditor.scss';

class ItemEditor extends Component {
    state = {
        itemService: ItemService.instance,
        codeService: CodeService.instance,
        userService: UserService.instance,
        model: null,
        modalShow: '',
        display: 'none',
    };
    codes = [];
    users = [];

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        MessageBus.listenFor(AppConstants.MSG_OPEN_MODAL, (payload) => {
            if (payload.target === 'itemeditor') {
                this.setState({ model: payload.data });
                if (payload.data !== null) {
                    this.openModal();
                } else {
                    this.closeModal();
                }
            }
        });
        this.state.codeService.getAll().then((resp) => {
            this.codes = resp;
        });
        this.state.userService.getAll().then((resp) => {
            this.users = resp;
        });
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
        this.state.itemService.updateItem(this.state.model);
        const payload = {
            target: 'home,items',
            data: this.state.model,
        };
        MessageBus.emit(AppConstants.MSG_REFRESH_DATA, payload);
        this.closeModal();
    }

    handleChange(name, e) {
        let model = this.state.model;
        model[name] = e.target.value;
        this.setState({ model: model });
    }

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
                                        <h5 className="modal-title">Edit Item {this.state.model.id}</h5>
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
                                                Title
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm input-sm"
                                                id="title"
                                                name="title"
                                                value={this.state.model.title}
                                                onChange={(e) => this.handleChange('title', e)}
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
                                                value={this.state.model.description}
                                                onChange={(e) => this.handleChange('description', e)}
                                            ></textarea>
                                        </div>
                                        <div className="controlrow">
                                            <div className="form-group dropdown">
                                                <div className="caption">Kanban Board</div>
                                                <CodeSelector
                                                    name="boardcode"
                                                    value={this.state.model.boardcode}
                                                    options={this.getSelectOptions('id', 'BOARD')}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group dropdown">
                                                <div className="caption">Project</div>
                                                <CodeSelector
                                                    name="projectcode"
                                                    value={this.state.model.projectcode}
                                                    options={this.getSelectOptions('id', 'PROJECT')}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group dropdown">
                                                <div className="caption">Priority</div>
                                                <CodeSelector
                                                    name="prioritycode"
                                                    value={this.state.model.prioritycode}
                                                    options={this.getSelectOptions('id', 'PRIORITY')}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group dropdown">
                                                <div className="caption">Size</div>
                                                <CodeSelector
                                                    name="sizecode"
                                                    value={this.state.model.sizecode}
                                                    options={this.getSelectOptions('id', 'SIZE')}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group dropdown">
                                                <div className="caption">Status</div>
                                                <CodeSelector
                                                    name="statuscode"
                                                    value={this.state.model.statuscode}
                                                    options={this.getSelectOptions('id', 'STATUS')}
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            <div className="form-group dropdown">
                                                <div className="caption">Assigned To</div>
                                                <CodeSelector
                                                    name="assignedtouser"
                                                    value={this.state.model.assignedtouser}
                                                    options={this.getSelectOptions('id', 'ASSIGNED')}
                                                    onChange={this.handleChange}
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
                                                value={this.state.model.comments}
                                                onChange={(e) => this.handleChange('comments', e)}
                                            ></textarea>
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

export default ItemEditor;
