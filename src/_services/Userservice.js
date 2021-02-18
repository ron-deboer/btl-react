import config from '../config';

export default class UserService {
    getAll() {
        const url = `${config.apiUrl}/user/getall`;
        return fetch(url).then((response) => response.json());
    }

    authenticate(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/user/authenticate`;
        return fetch(url, requestOptions).then((response) => response.json());
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
