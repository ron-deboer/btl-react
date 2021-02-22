import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

import CodeService from '../../_services/Codeservice';
import CodeEditor from './Codeeditor';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './codes.scss';

class Codes extends Component {
    state = { codeService: CodeService.instance, loading: true };
    codes = [];
    columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Code Type',
            selector: 'codetype',
            sortable: true,
        },
        {
            name: 'Code',
            selector: 'code',
            sortable: true,
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
        },
        {
            name: 'Edit',
            cell: (row) => (
                <button
                    className="btn-edit"
                    onClick={(e) => {
                        this.handleEditClick(row);
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
    componentDidMount() {
        this.state.codeService.getAll().then((resp) => {
            this.codes = JSON.parse(resp);
            this.setState({ loading: false });
        });
    }

    handleEditClick = (row) => {
        const id = parseInt(row.id, 10);
        const code = this.codes.find((x) => x.id === id);
        MessageBus.emit(AppConstants.MSG_OPEN_MODAL, code);
    };

    render() {
        return (
            <div className="codes-table">
                <h5>Codes</h5>
                <DataTable striped="true" columns={this.columns} data={this.codes} />
                <CodeEditor />
            </div>
        );
    }
}

export default Codes;
