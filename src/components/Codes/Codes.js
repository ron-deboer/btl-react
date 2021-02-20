import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

import CodeService from '../../_services/Codeservice';

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
    ];
    componentDidMount() {
        this.state.codeService.getAll().then((resp) => {
            this.codes = JSON.parse(resp);
            console.table(this.codes);
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <div>
                <h5>Codes</h5>
                <DataTable striped="true" columns={this.columns} data={this.codes} />
            </div>
        );
    }
}

export default Codes;
