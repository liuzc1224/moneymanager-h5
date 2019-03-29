import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as AppActions from '../actions/AppActions';

import TabSwitch from './../components/common/TabSwitch';
import Spinner from './../components/common/Spinner';
import Toast from './../components/common/Toast';
import Alert from './../components/common/Alert';

class AppContainer extends Component {
  render() {
    const { children, location, spinnerReducer, toastReducer, alertReducer, actions } = this.props;

    return (
      <div>
        {children}
        <TabSwitch
          pathname={location.pathname} />
        
        <Spinner 
          showLoading={spinnerReducer.showLoading} 
          showDropback={spinnerReducer.showDropback} 
          type={'load8'}/>

        <Toast 
          list={toastReducer.list} />

        <Alert 
          doAction={actions.doAction}
          isShow={alertReducer.isShow}
          title={alertReducer.title}
          isIntegralDraw={alertReducer.isIntegralDraw}
          descriptionFlag={alertReducer.descriptionFlag}
          description={alertReducer.description}
          actions={alertReducer.actions}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    spinnerReducer:state.spinnerReducer,
    toastReducer: state.toastReducer,
    alertReducer: state.alertReducer
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
)(AppContainer);
