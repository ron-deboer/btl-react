import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import ItemService from '../../_services/Itemservice';

const Reports = (props) => {
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
    ];

    // didMount
    useEffect(() => {
        itemService.getAll().then((resp) => {
            setItems(resp);
        });
    }, []);

    return (
        <div>
            <h5>Reports</h5>
            <DataTable striped="true" columns={columns} data={items} />
        </div>
    );
};

export default Reports;
