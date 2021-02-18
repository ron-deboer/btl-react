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
    isAuthenticated = false;
    userService = UserService.instance;

    login(username, password) {
        this.isAuthenticated = false;
        let enc = CryptoJS.Rabbit.encrypt(`${username}.${password}`, 'QprU5OzwntBSJFfo6b6XRByY8G8cQELn');
        const dat = enc.toString();
        return this.userService.authenticate({ dat: dat }).then(
            (user) => {
                this.user = user;
                sessionStorage.setItem('user', JSON.stringify(user));
                this.isAuthenticated = true;
                return true;
            },
            (err) => {
                this.logout();
                return false;
            }
        );
    }

    logout() {}
}

export default AuthService;
