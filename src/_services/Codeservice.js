import config from '../config';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class CodeService {
    // force this class to be a singleton
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) alert('Cannot construct singleton');
    }
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new CodeService(singletonEnforcer);
        }
        return this[singleton];
    }

    getAll() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: null,
        };
        const url = `${config.apiUrl}/code/getall`;
        return fetch(url, requestOptions).then((response) => {
            return JSON.parse(response.json());
        });
    }

    updateCode(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/code/update`;
        return fetch(url, requestOptions).then((response) => JSON.parse(response.json()));
    }

    insertCode(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/code/insert`;
        return fetch(url, requestOptions).then((response) => JSON.parse(response.json()));
    }
}

export default CodeService;
