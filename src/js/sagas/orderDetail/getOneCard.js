import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { get } from './../../lib/fetch';

import serviceApi from './../../api';

export function getOneCardFetch(param) {
  return get(serviceApi.escrowHost + serviceApi.getOneCard +"/"+ param.uccId, {
      body:""
  });
}

export default function *getOneCard() {
  while (true) {

    const { param } = yield take('GET_ONECARD')

    yield put( AppActions.doAction('SHOW_LOADING') )

    const dataObj = yield call(getOneCardFetch, param);
    const dataObjData = dataObj.data;

    if (dataObjData.success) {
        yield put( AppActions.doAction('ONECARD_INFO_FETCH', dataObjData.data) )
    }else{
        yield put( AppActions.doAction('TOAST', dataObjData.message) )
    }

    yield put( AppActions.doAction('HIDE_LOADING') );

  }
}