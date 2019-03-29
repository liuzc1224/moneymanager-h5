import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { get } from './../../lib/fetch';

import serviceApi from './../../api';

export function getCodeFetch(param) {
  return get(serviceApi.escrowHost + serviceApi.sendCode, {
    body: param
  });
}

export default function *checkMobile() {
  while (true) {

    const { param } = yield take('SEND_REGISTER_CODE')

    yield put( AppActions.doAction('SHOW_LOADING') )

    const checkDataObj = yield call(getCodeFetch, param);
    const checkDataObjData = checkDataObj.data;

    if (checkDataObjData.success) {
        yield put( AppActions.doAction('REGISTER_CODE_FETCH', {canStartCutDown: checkDataObjData.success}) )
    }else{
        yield put( AppActions.doAction('TOAST', checkDataObjData.message) )
    }

    yield put( AppActions.doAction('HIDE_LOADING') );

  }
}