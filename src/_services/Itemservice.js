import config from '../config';
import { appstore } from '../_store/appstore';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class ItemService {
    // force this class to be a singleton
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) alert('Cannot construct singleton');
    }
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new ItemService(singletonEnforcer);
        }
        return this[singleton];
    }

    getAll() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: null,
        };
        const url = `${config.apiUrl}/item/getall`;
        return fetch(url, requestOptions).then((response) => {
            return JSON.parse(response.json());
        });
    }

    updateItem(data) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/item/update`;
        return fetch(url, requestOptions).then((response) => JSON.parse(response.json()));
    }

    insertItem(data) {
        data.id = appstore.getNewItemId();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        const url = `${config.apiUrl}/item/insert`;
        return fetch(url, requestOptions).then((response) => JSON.parse(response.json()));
    }
}

export default ItemService;
