import config from '../config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class UserService {
    // force this class to be a singleton
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) alert('Cannot construct singleton');
    }
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new UserService(singletonEnforcer);
        }
        return this[singleton];
    }

    getAll() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: null,
        };
        const url = `${config.apiUrl}/user/getall`;
        return fetch(url, requestOptions).then((response) => response.json());
    }

    authenticate(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/user/authenticate`;
        return fetch(url, requestOptions).then((response) => {
            return response.json();
        });
    }

    updateUser(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/user/update`;
        return fetch(url, requestOptions).then((response) => response.json());
    }

    insertUser(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/user/insert`;
        return fetch(url, requestOptions).then((response) => response.json());
    }
}

export default UserService;
