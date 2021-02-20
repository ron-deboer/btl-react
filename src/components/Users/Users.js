import React, { Component } from 'react';
import DataTable from 'react-data-table-component';

import UserService from '../../_services/Userservice';

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
    ];
    componentDidMount() {
        this.state.userService.getAll().then((resp) => {
            this.users = JSON.parse(resp);
            this.setState({ loading: false });
        });
    }

    render() {
        return (
            <div>
                <h5>Users</h5>
                <DataTable striped="true" columns={this.columns} data={this.users} />
            </div>
        );
    }
}

export default Users;
