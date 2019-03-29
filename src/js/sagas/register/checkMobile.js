import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { get } from './../../lib/fetch';

import serviceApi from './../../api';

export function getCheckMobileFetch(param) {
  return get(serviceApi.escrowHost + serviceApi.checkMobile, {
    body: param
  });
}

export default function *checkMobile() {
  while (true) {

    const { param } = yield take('GO_REGISTER_CHECK')

    yield put( AppActions.doAction('SHOW_LOADING') )

    const checkDataObj = yield call(getCheckMobileFetch, param);
    const checkDataObjData = checkDataObj.data;
    let isShowNextStepInp = false;

    if (checkDataObjData.success) {
        isShowNextStepInp = true
    }else{
        yield put( AppActions.doAction('TOAST', checkDataObjData.message) )
    }

    yield put( AppActions.doAction('CHECK_MOBILE_FETCH', {
      isShowNextStepInp: isShowNextStepInp
    }) )

    yield put( AppActions.doAction('HIDE_LOADING') );
  }
}