import UserService from './Userservice';
import * as CryptoJS from 'crypto-js';

const singleton = Symbol();
const singletonEnforcer = Symbol();

class AuthService {
    // force this class to be a singleton
    constructor(enforcer) {
        if (enforcer !== singletonEnforcer) alert('Cannot construct singleton');
    }
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new AuthService(singletonEnforcer);
        }
        return this[singleton];
    }

    user = null;
    authenticated = false;
    userService = UserService.instance;

    get isAuthenticated() {
        if (!this[singleton]) {
            this[singleton] = new AuthService(singletonEnforcer);
        }
        return this.authenticated;
    }

    login(username, password) {
        this.authenticated = false;
        let enc = CryptoJS.Rabbit.encrypt(`${username}.${password}`, 'QprU5OzwntBSJFfo6b6XRByY8G8cQELn');
        const dat = enc.toString();
        return this.userService.authenticate({ dat: dat }).then(
            (user) => {
                this.user = JSON.parse(user);
                sessionStorage.setItem('user', JSON.stringify(this.user));
                this.authenticated = true;
                return { isLoggedIn: true, user: { name: this.user.name } };
            },
            (err) => {
                this.logout();
                return { isLoggedIn: false, user: { name: '' } };
            }
        );
    }

    logout() {
        sessionStorage.removeItem('user');
        this.authenticated = false;
    }
}

export default AuthService;
