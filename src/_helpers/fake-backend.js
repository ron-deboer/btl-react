import { db, persistDb } from './fake-data';
import * as CryptoJS from 'crypto-js';

export function InitFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method, headers } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            setTimeout(handleRoute, 250);

            function handleRoute() {
                switch (true) {
                    case url.includes('/user/'):
                        return handleUserRoute(url, method);
                        break;
                    case url.includes('/code/'):
                        return handleCodeRoute(url, method);
                        break;
                    case url.includes('/item/'):
                        return handleItemRoute(url, method);
                        break;
                    default:
                        return realFetch(url, opts)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        break;
                }
            }
            /**
             * user route handler
             */
            function handleUserRoute(url, method) {
                const dtype = 'users';
                switch (true) {
                    case url.endsWith('/authenticate') && method === 'POST':
                        return authenticate(body.dat);
                        break;
                    case url.endsWith('/update') && method === 'POST':
                        return doUpdate(body, dtype);
                        break;
                    case url.endsWith('/insert') && method === 'POST':
                        return doInsert(body, dtype);
                        break;
                    case url.endsWith('/getall') && method === 'GET':
                        return doGetAll(dtype);
                        break;
                    default:
                        return realFetch(url, opts)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        break;
                }
            }
            /**
             * code route handler
             */
            function handleCodeRoute(url, method) {
                const dtype = 'code';
                switch (true) {
                    case url.endsWith('/update') && method === 'POST':
                        return doUpdate(body, dtype);
                        break;
                    case url.endsWith('/insert') && method === 'POST':
                        return doInsert(body, dtype);
                        break;
                    case url.endsWith('/getall') && method === 'GET':
                        return doGetAll(dtype);
                        break;
                    default:
                        return realFetch(url, opts)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        break;
                }
            }
            /**
             * code route handler
             */
            function handleItemRoute(url, method) {
                const dtype = 'item';
                switch (true) {
                    case url.endsWith('/update') && method === 'POST':
                        return doUpdate(body, dtype);
                        break;
                    case url.endsWith('/insert') && method === 'POST':
                        return doInsert(body, dtype);
                        break;
                    case url.endsWith('/getall') && method === 'GET':
                        return doGetAll(dtype);
                        break;
                    default:
                        return realFetch(url, opts)
                            .then((response) => resolve(response))
                            .catch((error) => reject(error));
                        break;
                }
            }

            /**
             * authenticate user
             */
            function authenticate(dat) {
                let dec = CryptoJS.Rabbit.decrypt(dat, 'QprU5OzwntBSJFfo6b6XRByY8G8cQELn');
                const tmp = dec.toString(CryptoJS.enc.Utf8);
                const a = tmp.split('.');
                let row = db.users.find((x) => x.username === a[0] && x.password === a[1]);
                if (row === undefined) {
                    return error('Invalid credentials');
                }
                const user = row;
                return ok({
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: '',
                    role: user.role,
                    token: `dummy-jwt-token.${user.id}`,
                    boardcode: user.boardcode,
                });
            }
            /**
             * update existing row
             */
            function doUpdate(dat, dtype) {
                let row = db[dtype].find((x) => x.id === dat.id);
                Object.keys(dat).forEach((fld) => {
                    if (fld !== 'id') {
                        row[fld] = dat[fld];
                    }
                });
                setTimeout(() => {
                    persistDb();
                }, 250);
                return ok({});
            }
            /**
             * insert new row
             */
            function doInsert(dat, dtype) {
                db[dtype].push(dat);
                setTimeout(() => {
                    persistDb();
                }, 250);
                return ok({});
            }
            /**
             * get all rows
             */
            function doGetAll(dtype) {
                let results = db[dtype];
                return ok(results);
            }
            /**
             * util functions
             */
            function ok(body) {
                resolve({
                    ok: true,
                    json: () => Promise.resolve(JSON.stringify(body)),
                });
            }

            function unauthorized() {
                resolve({
                    status: 401,
                    json: () => Promise.resolve(JSON.stringify({ message: 'Unauthorized' })),
                });
            }

            function error(message) {
                resolve({ status: 400, json: () => Promise.resolve(JSON.stringify({ message })) });
            }

            function idFromUrl() {
                const urlParts = url.split('/');
                return parseInt(urlParts[urlParts.length - 1]);
            }
        });
    };
}
