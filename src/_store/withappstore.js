import React, { useEffect, useState } from 'react';
import AppConstants from '../appconstants';
import MessageBus from '../_services/Messagebus';
import { appstore, initialstoredata } from './appstore';

const WithAppStore = (WrappedComponent) => {
    return function WithAppStoreComponent({ appStore, ...props }) {
        const [store, setStore] = useState(initialstoredata);
        let subscription = null;

        useEffect(() => {
            subscription = appstore.observable.subscribe((data) => {
                setStore(data);
            });
            appstore.fetchItemsAndCodes();
            MessageBus.listenFor(AppConstants.MSG_REFRESH_DATA, (payload) => {
                if (payload.target.indexOf('itemsandcodes') > -1) {
                    appstore.fetchItemsAndCodes();
                }
            });
            return () => {
                subscription.unsubscribe();
            };
        }, []);

        return <WrappedComponent appStore={store} {...props} />;
    };
};

export default WithAppStore;
