import React, { Component } from 'react';

class Card extends Component {
    state = {};

    componentDidMount() {}

    getCodeClass(codetype, code) {
        const c = code.toLowerCase();
        if (codetype === 'user') {
            return 'badge-primary';
        }
        if (codetype === 'size') {
            if (c === 'large') {
                return 'badge-danger';
            }
            if (c === 'medium') {
                return 'badge-warning';
            }
            return 'badge-success';
        }
        if (codetype !== 'status') {
            if (c === 'high') {
                return 'badge-danger';
            }
            if (c === 'medium') {
                return 'badge-warning';
            }
            return 'badge-success';
        }
        if (c === 'open') {
            return 'badge-danger';
        }
        if (c !== 'closed') {
            return 'badge-warning';
        }
        return 'badge-success';
    }

    render() {
        return (
            <div className="item-card">
                <div className="item-card-body">
                    <div className="header">
                        <div className="title">
                            <span className="id">({this.props.item.id})</span> {this.props.item.title}
                        </div>
                        <div className="handle">
                            <button
                                className="btn-edit"
                                data-title="Edit"
                                data-toggle="modal"
                                data-target="#edit"
                            >
                                <span className="icon">...</span>
                            </button>
                        </div>
                    </div>
                    <div className="item-card-text">
                        <div className="codes">
                            <div className="code">
                                Project
                                <br />
                                <span className={`badge badge-pill badge-info`}>
                                    {' '}
                                    {this.props.item.projectcode}
                                </span>
                            </div>
                            <div className="code">
                                Priority
                                <br />
                                <span
                                    className={`badge badge-pill ${this.getCodeClass(
                                        'priority',
                                        this.props.item.projectcode
                                    )}`}
                                >
                                    {this.props.item.prioritycode}
                                </span>
                            </div>
                            <div className="code">
                                Size
                                <br />
                                <span
                                    className={`badge badge-pill ${this.getCodeClass(
                                        'size',
                                        this.props.item.sizecode
                                    )}`}
                                >
                                    {this.props.item.sizecode}
                                </span>
                            </div>
                            <div className="code">
                                Status
                                <br />
                                <span
                                    className={`badge badge-pill ${this.getCodeClass(
                                        'status',
                                        this.props.item.statuscode
                                    )}`}
                                >
                                    {this.props.item.statuscode}
                                </span>
                            </div>
                            <div className="code">
                                Assigned
                                <br />
                                <span
                                    className={`badge badge-pill ${this.getCodeClass(
                                        'user',
                                        this.props.item.assignedtouser
                                    )}`}
                                >
                                    {this.props.item.assignedtouser}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;
