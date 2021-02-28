import React from 'react';

import Card from './Card';

const Column = (props) => {
    return (
        <div className="column">
            <div className="header">
                <div className="title">{props.title} Items</div>
                <button className="btn-edit" data-title="Edit" data-toggle="modal" data-target="#edit">
                    <i className="fa fa-plus fa-xs icon"></i>
                </button>
            </div>
            <ul className="open-items items">
                {props.items.map((card, i) => (
                    <li key={card.id}>
                        <Card item={card} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Column;
