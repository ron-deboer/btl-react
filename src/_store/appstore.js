import { BehaviorSubject } from 'rxjs';
const initialstoredata = {
    user: {
        userName: 'Ron deBoer',
        isLoggedIn: false,
    },
};
class AppStore {
    observable = new BehaviorSubject(initialstoredata);

    updateUser = (data) => {
        let dat = Object.assign({}, this.observable.getValue());
        Object.keys(data).forEach((key) => {
            dat.user[key] = data[key];
        });
        this.observable.next(dat);
    };
}
const appstore = new AppStore();
export { appstore, initialstoredata };
