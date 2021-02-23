import React, { Component } from 'react';

import UserService from '../../_services/Userservice';

import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './usereditor.scss';

class UserEditor extends Component {
    state = {
        userService: UserService.instance,
        model: null,
        modalShow: '',
        display: 'none',
    };
    roles = ['admin', 'user'];

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
            if (payload.target === 'usereditor') {
                this.setState({ model: payload.data });
                if (payload.data !== null) {
                    this.openModal();
                } else {
                    this.closeModal();
                }
            }
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

    handleSave() {
        this.closeModal();
    }

    handleChange(name, e) {
        let model = this.state.model;
        model[name] = e.target.value;
        this.setState({ model: model });
    }

    handleSubmit() {}

    render() {
        if (this.state.model === null) {
            return false;
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
                                        <h5 className="modal-title">Edit User {this.state.model.id}</h5>
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
                                            <label className="label" htmlFor="username">
                                                User Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm input-sm dropdown"
                                                id="username"
                                                name="username"
                                                value={this.state.model.username}
                                                onChange={(e) => this.handleChange('username', e)}
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
                                                value={this.state.model.name}
                                                onChange={(e) => this.handleChange('name', e)}
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
                                                value={this.state.model.email}
                                                onChange={(e) => this.handleChange('email', e)}
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
                                                value={this.state.model.role}
                                                onChange={(e) => this.handleChange('role', e)}
                                            >
                                                {this.roles.map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={this.closeModal}>
                                            Close
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={this.handleSave}>
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

export default UserEditor;
