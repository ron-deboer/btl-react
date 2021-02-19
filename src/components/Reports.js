import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

import ItemService from '../_services/Itemservice';

class Reports extends Component {
    state = { itemService: ItemService.instance, loading: true };
    items = [];
    columns = [
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
    componentDidMount() {
        this.state.itemService.getAll().then((resp) => {
            this.items = JSON.parse(resp);
            console.table(this.items);
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <div>
                <h5>Reports</h5>
                <DataTable columns={this.columns} data={this.items} />
            </div>
        );
    }
}

export default Reports;
