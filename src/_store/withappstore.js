import React from 'react';
import { appstore, initialstoredata } from './appstore';

const withAppStore = (WrappedComponent) => {
    return class extends React.Component {
        state = { appStore: initialstoredata };

        subscription = null;

        componentDidMount = () => {
            console.log(appstore);
            console.log('hoc componentDidMount', this.state);
            this.subscription = appstore.observable.subscribe((appStore) => {
                this.setState({ appStore: appStore });
                console.log('hoc subscribe', this.state);
            });
        };

        componentWillUnmount = () => {
            this.subscription.unsubscribe();
        };

        render() {
            console.log('hoc render', this.state);
            return <WrappedComponent appStore={this.state.appStore} {...this.props} />;
        }
    };
};

export default withAppStore;
