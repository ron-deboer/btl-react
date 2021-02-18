import UserService from './Userservice';
import * as CryptoJS from 'crypto-js';

export default class AuthService {
    isAuthenticated = false;

    login(username, password) {
        this.authenticated = false;
        let enc = CryptoJS.Rabbit.encrypt(`${username}.${password}`, 'QprU5OzwntBSJFfo6b6XRByY8G8cQELn');
        const dat = enc.toString();
        return UserService.authenticate({ data: dat }).then(
            (user) => {
                // this.user = user;
                // this.msgBusService.broadcast(EventType.Refresh, {});
                // sessionStorage.setItem('user', JSON.stringify(user));
                // this.authenticated = true;
                // this.router.navigate([this.redirectUrl]);
                // return true;
            },
            (err) => {
                this.logout();
                return false;
            }
        );
    }
}
