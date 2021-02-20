import React, { Component } from 'react';

import Card from './Card';

class Column extends Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <div className="column">
                <div className="header">
                    <div className="title">{this.props.title} Items</div>
                    <div>
                        <button
                            className="btn-edit"
                            data-title="Edit"
                            data-toggle="modal"
                            data-target="#edit"
                        >
                            <i className="fa fa-plus fa-xs icon"></i>
                        </button>
                    </div>
                </div>
                <ul className="open-items items">
                    {this.props.items.map((card, i) => (
                        <li>
                            <Card key={i} item={card} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Column;
