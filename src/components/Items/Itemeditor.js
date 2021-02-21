import React, { Component } from 'react';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';

import CodeSelector from '../CodeSelector/CodeSelector';

import './modal.scss';

class ItemEditor extends Component {
    state = {
        itemService: ItemService.instance,
        codeService: CodeService.instance,
        loading: true,
    };
    codes = [];
    model = null;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.state.codeService.getAll().then((resp) => {
            this.codes = resp;
        });
        this.setState({ loading: false });
    }

    componentDidUpdate(prevProps) {
        this.model = this.props.item;
    }

    getSelectOptions(key, codeType) {
        return this.props.codes
            .filter((x) => x.codetype === codeType)
            .map((x) => {
                return {
                    key: codeType + '_' + x.id,
                    code: x.code,
                };
            });
    }

    handleChange(name, e) {
        this.model[name] = e.target.value;
    }

    handleSubmit() {}

    render() {
        if (this.model === null) {
            return false;
        }
        const model = this.model;
        const classnames = this.props.show ? 'modal display-block' : 'modal display-none';
        return (
            <div className={classnames} id="edit-modal" tabIndex="-1" role="dialog">
                <div className="modal-main">
                    <form className="needs-validation">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Edit Item {model.id}
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
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
                                        value={model.description}
                                        onChange={(e) => this.handleChange('description', e)}
                                    ></textarea>
                                </div>
                                <div className="controlrow">
                                    <div className="form-group">
                                        <label className="label" htmlFor="boardcode">
                                            Kanban Board
                                        </label>
                                        <CodeSelector
                                            name="boardcode"
                                            options={this.getSelectOptions('id', 'BOARD')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="projectcode">
                                            Project
                                        </label>
                                        <CodeSelector
                                            name="projectcode"
                                            options={this.getSelectOptions('id', 'PROJECT')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="prioritycode">
                                            Priority
                                        </label>
                                        <CodeSelector
                                            name="prioritycode"
                                            options={this.getSelectOptions('id', 'PRIORITY')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="sizecode">
                                            Size
                                        </label>
                                        <CodeSelector
                                            name="sizecode"
                                            options={this.getSelectOptions('id', 'SIZE')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="statuscode">
                                            Status
                                        </label>
                                        <CodeSelector
                                            name="statuscode"
                                            options={this.getSelectOptions('id', 'STATUS')}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="label" htmlFor="assignedtouser">
                                            Assigned To
                                        </label>
                                        <CodeSelector
                                            name="assignedtouser"
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
                                        value={model.comments}
                                        onChange={(e) => this.handleChange('comments', e)}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default ItemEditor;