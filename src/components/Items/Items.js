import React, { Component } from 'react';

import DataTable from 'react-data-table-component';
import JsxIf from '../../_directives/jsxif';

import ItemService from '../../_services/Itemservice';
import ItemEditor from './Itemeditor';

class Items extends Component {
    state = { itemService: ItemService.instance, edit: false, loading: true };
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
        {
            name: 'Edit',
            cell: (row) => (
                <button className="btn-edit" onClick={this.handleEditClick} id={row.id}>
                    <i className="fa fa-pencil fa-xs"></i>
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    componentDidMount() {
        this.state.itemService.getAll().then((resp) => {
            this.items = JSON.parse(resp);
            this.setState({ loading: false });
        });
    }

    handleEditClick = (e) => {
        const id = parseInt(e.target.id, 10);
        const item = this.items.find((x) => x.id === id);
        console.log(item);
        this.state.edit = true;
    };

    render() {
        return (
            <div>
                <h5>Items</h5>
                <DataTable striped="true" columns={this.columns} data={this.items} />
                <JsxIf cond={this.state.edit}>
                    <ItemEditor />
                </JsxIf>
            </div>
        );
    }
}

export default Items;
