import React, { Component } from 'react';

import DataTable from 'react-data-table-component';
import JsxIf from '../../_directives/jsxif';

import ItemService from '../../_services/Itemservice';
import CodeService from '../../_services/Codeservice';
import ItemEditor from './Itemeditor';

import './items.scss';

class Items extends Component {
    state = {
        itemService: ItemService.instance,
        codeService: CodeService.instance,
        edit: false,
        item: null,
        loading: true,
    };
    items = [];
    codes = [];
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
                <button className="btn-edit" onClick={this.handleEditClick(row)}>
                    <i className="fa fa-pencil fa-xs"></i>
                </button>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    componentDidMount() {
        this.state.itemService.getAll().then((resp) => {
            this.items = JSON.parse(resp);
            this.setState({ loading: false });
        });
        this.state.codeService.getAll().then((resp) => {
            this.codes = JSON.parse(resp);
        });
    }

    handleEditClick = (row) => {
        return function (e) {
            const id = parseInt(row.id, 10);
            const item = this.items.find((x) => x.id === id);
            this.setState({ item: item, edit: true });
            console.log(item);
        }.bind(this);
    };

    render() {
        return (
            <div className="items-table">
                <h5>Items</h5>
                <DataTable striped="true" columns={this.columns} data={this.items} />
                <ItemEditor show={this.state.edit} item={this.state.item} codes={this.codes} />
            </div>
        );
    }
}

export default Items;
