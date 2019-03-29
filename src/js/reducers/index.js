import { combineReducers } from 'redux';
import spinnerReducer from './spinnerReducer';
import toastReducer from './toastReducer';
import alertReducer from './alertReducer';
import progressReducer from './progressReducer';

import checkMobileReducer from './register/checkMobileReducer';
import codeReducer from './register/codeReducer';
import checkEmailReducer from './H5registration/checkEmailReducer'
import emailCode from './H5registration/emailCode'

import billInfoReducer from './orderDetail/billInfoReducer';
import oneCardInfoReducer from './orderDetail/oneCardInfoReducer';

import creditInfoReducer from './credit/creditInfoReducer';

import chartInfoReducer from './bookkeep/chartInfoReducer';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
  spinnerReducer,
  toastReducer,
  alertReducer,
  checkMobileReducer,
  codeReducer,
  billInfoReducer,
  oneCardInfoReducer,
  creditInfoReducer,
  chartInfoReducer,
  checkEmailReducer,
  emailCode,
  progressReducer,
})

export default rootReducer;