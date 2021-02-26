import React, { useEffect, useState } from 'react';
import { appstore, initialstoredata } from './appstore';

const WithAppStore = (WrappedComponent) => {
    return function WithAppStoreComponent({ appStore, ...props }) {
        const [store, setStore] = useState(initialstoredata);
        let subscription = null;
        useEffect(() => {
            subscription = appstore.observable.subscribe((data) => {
                setStore(data);
            });
            return () => {
                subscription.unsubscribe();
            };
        }, []);

        return <WrappedComponent appStore={store} {...props} />;
    };
};

export default WithAppStore;
