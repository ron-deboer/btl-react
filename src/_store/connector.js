import { connect } from 'react-redux';
import counter from './Counter';

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        countValue: state.count,
    };
}

// Actions
var increaseAction = { type: 'increase' };
var decreaseAction = { type: 'decrease' };

// Map actions to props
function mapDispatchToProps(dispatch) {
    return {
        increaseCount: function () {
            return dispatch(increaseAction);
        },
        decreaseCount: function () {
            return dispatch(decreaseAction);
        },
    };
}

// HOC
var connector = connect(mapStateToProps, mapDispatchToProps)(counter);

export default connector;
