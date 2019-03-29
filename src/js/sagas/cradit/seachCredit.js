import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { get } from './../../lib/fetch';

import serviceApi from './../../api';

export function seachCreditFetch() {
  return get(serviceApi.escrowHost + serviceApi.seachCredit, {
      body: ""
  });
}

export default function *seachCredit() {
  while (true) {

    yield take('SEACH_CREDIT')

    yield put( AppActions.doAction('SHOW_LOADING') )

    const dataObj = yield call(seachCreditFetch);
    const dataObjData = dataObj.data;

    if (dataObjData && dataObjData.success) {
        yield put( AppActions.doAction('CREDIT_INFO_FETCH', dataObjData.data) )
    }else{
        yield put( AppActions.doAction('TOAST', dataObjData && dataObjData.message) )
    }

    yield put( AppActions.doAction('HIDE_LOADING') );

  }
}