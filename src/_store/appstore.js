import { BehaviorSubject } from 'rxjs';
import CodeService from '../_services/Codeservice';
import ItemService from '../_services/Itemservice';

const initialstoredata = {
    user: {
        userName: 'Ron deBoer',
        isLoggedIn: false,
    },
    items: [],
    codes: [],
};
class AppStore {
    observable = new BehaviorSubject(initialstoredata);
    itemService = ItemService.instance;
    codeService = CodeService.instance;

    updateUser = (data) => {
        let dat = Object.assign({}, this.observable.getValue());
        Object.keys(data).forEach((key) => {
            dat.user[key] = data[key];
        });
        this.observable.next(dat);
    };

    fetchItemsAndCodes = () => {
        let prArray = [];
        prArray.push(
            this.itemService.getAll().then((resp) => {
                return resp;
            })
        );
        prArray.push(
            this.codeService.getAll().then((resp) => {
                return resp;
            })
        );
        Promise.all(prArray).then((values) => {
            let dat = Object.assign({}, this.observable.getValue());
            dat.items = values[0];
            dat.codes = values[1];
            this.observable.next(dat);
        });
    };

    getNewItemId() {
        const last = this.observable
            .getValue()
            .items.sort((i1, i2) => (parseInt(i1.id, 10) > parseInt(i2.id, 10) ? 1 : -1))
            .slice(-1)[0];
        return last.id + 1;
    }
}
const appstore = new AppStore();
export { appstore, initialstoredata };
