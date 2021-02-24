import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

import UserService from '../../_services/Userservice';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './users.scss';

class Users extends Component {
    state = { userService: UserService.instance, loading: true };
    users = [];
    columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'User Name',
            selector: 'username',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Role',
            selector: 'role',
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

    constructor(props) {
        super(props);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    componentDidMount() {
        this.state.userService.getAll().then((resp) => {
            this.users = resp;
            this.setState({ loading: false });
        });
    }

    handleEditClick = (row) => {
        const id = parseInt(row.id, 10);
        const user = this.users.find((x) => x.id === id);
        const payload = {
            target: 'usereditor',
            data: user,
        };
        MessageBus.emit(AppConstants.MSG_OPEN_MODAL, payload);
    };

    render() {
        return (
            <div className="users-table">
                <h5>Users</h5>
                <DataTable striped="true" columns={this.columns} data={this.users} />
            </div>
        );
    }
}

export default Users;
