import React from 'react';

import { IItem } from '../../_interfaces/item';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import Card from './Card';

const Column = (props) => {
    const handleAddItem = () => {
        const payload = {
            target: 'itemeditor',
            data: IItem,
        };
        payload.data.boardcode = props.boardcode;
        payload.data.statuscode = props.statuscode;
        MessageBus.emit(AppConstants.MSG_OPEN_MODAL, payload);
    };

    return (
        <div className="column">
            <div className="header">
                <div className="title">{props.title} Items</div>
                <button className="btn-edit" onClick={handleAddItem}>
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
