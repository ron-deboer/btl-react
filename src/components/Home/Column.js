import React from 'react';

import { IItem } from '../../_interfaces/item';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import Card from './Card';

import './column.scss';

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
        <div className="column-container">
            <div className="ccheader">
                <div className="title">{props.title} Items</div>
                <div className="newitem">
                    <button className="btn-edit" onClick={handleAddItem}>
                        <i className="fa fa-plus fa-xs"></i>
                    </button>
                </div>
            </div>
            <div className="itemlist">
                <ul className="open-items items">
                    {props.items.map((card, i) => (
                        <li key={card.id}>
                            <Card item={card} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Column;
