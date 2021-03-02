import React, { useState, useEffect } from 'react';

import DataTable from 'react-data-table-component';

import ItemService from '../../_services/Itemservice';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './items.scss';

const Items = (props) => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const itemService = ItemService.instance;
    const columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Title',
            selector: 'title',
            sortable: true,
        },
        {
            name: 'Board Code',
            selector: 'boardcode',
            sortable: true,
        },
        {
            name: 'Size',
            selector: 'sizecode',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'statuscode',
            sortable: true,
        },
        {
            name: 'Assigned to',
            selector: 'assignedtouser',
            sortable: true,
        },
        {
            name: 'Project Code',
            selector: 'projectcode',
            sortable: true,
        },
        {
            name: 'Edit',
            cell: (row) => (
                <button
                    className="btn-edit"
                    onClick={(e) => {
                        handleEditClick(row);
                    }}
                >
                    <i className="fa fa-pencil fa-xs"></i>
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // didMount
    useEffect(() => {
        MessageBus.listenFor(AppConstants.MSG_REFRESH_DATA, (payload) => {
            if (payload.target.indexOf('itemlist') > -1) {
                fetchData();
            }
        });
        fetchData();
    }, []);

    const fetchData = () => {
        itemService.getAll().then((resp) => {
            setItems(resp);
        });
    };

    const handleEditClick = (row) => {
        const id = parseInt(row.id, 10);
        const item = items.find((x) => x.id === id);
        const payload = {
            target: 'itemeditor',
            data: item,
        };
        MessageBus.emit(AppConstants.MSG_OPEN_MODAL, payload);
    };

    return (
        <div className="items-table">
            <h5>Items</h5>
            <DataTable striped="true" columns={columns} data={items} />
        </div>
    );
};

export default Items;
