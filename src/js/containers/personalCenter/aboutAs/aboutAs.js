import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../../../actions/AppActions';

import Item from '../../../components/pages/aboutAs';

class aboutAs extends Component {
    render() {
        // const { spinnerReducer, toastReducer, checkMobileReducer, codeReducer } = this.props;
        // const { actions } = this.props;
        return (
            <div style={ { paddingTop: '10px'} }>
               <Item />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        spinnerReducer:state.spinnerReducer,
        toastReducer: state.toastReducer,
        checkMobileReducer: state.checkMobileReducer,
        codeReducer: state.codeReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(AppActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(aboutAs);