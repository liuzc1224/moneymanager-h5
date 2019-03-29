import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { post } from './../../lib/fetch';

import serviceApi from './../../api';

export function getBillFetch(param) {
  return post(serviceApi.escrowHost + serviceApi.getBill, {
      body: param
  });
}

export default function *getBill() {
  while (true) {
    const { param } = yield take('GET_BILL')

    if (param.isProgress) {
      yield put( AppActions.doAction('BEGIN_PRORESS') )
    }

    yield put( AppActions.doAction('SHOW_LOADING') )

    const dataObj = yield call(getBillFetch, param);
    const dataObjData = dataObj.data;

    yield put( AppActions.doAction('STOP_PRORESS') )

    if (dataObjData && dataObjData.success) {
        yield put( AppActions.doAction('BILL_INFO_FETCH', dataObjData.data) )
    }else{
        yield put( AppActions.doAction('TOAST', dataObjData && dataObjData.message) )
    }

    yield put( AppActions.doAction('HIDE_LOADING') );

  }
}