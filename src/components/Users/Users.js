import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

import UserService from '../../_services/Userservice';
import AppConstants from '../../appconstants';
import MessageBus from '../../_services/Messagebus';

import './users.scss';

const Users = (props) => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const userService = UserService.instance;
    const columns = [
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
        userService.getAll().then((resp) => {
            setUsers(resp);
        });
    }, []);

    const handleEditClick = (row) => {
        const id = parseInt(row.id, 10);
        const user = users.find((x) => x.id === id);
        const payload = {
            target: 'usereditor',
            data: user,
        };
        MessageBus.emit(AppConstants.MSG_OPEN_MODAL, payload);
    };

    return (
        <div className="users-table">
            <h5>Users</h5>
            <DataTable striped="true" columns={columns} data={users} />
        </div>
    );
};

export default Users;
