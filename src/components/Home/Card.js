import React, { Component } from 'react';

class Card extends Component {
    state = {};

    componentDidMount() {}

    render() {
        return (
            <li className="card">
                <h5>Card</h5>
                <h6>{this.props.item.title}</h6>
            </li>
        );
    }
}

export default Card;
