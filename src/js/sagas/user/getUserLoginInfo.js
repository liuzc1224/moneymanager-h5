import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { post } from './../../lib/fetch';

import serviceApi from './../../api';

export function getUserLoginInfoFetch() {
  return post(serviceApi.escrowHost + serviceApi.getUserLoginInfo);
}

export default function *getUserLoginInfo() {
  while (true) {
  	yield take('GET_USER_LOGIN_INFO')

    yield put( AppActions.doAction('SHOW_LOADING') )

    const userInfoObj = yield call(getUserLoginInfoFetch);
    const userInfoData = userInfoObj.data;

    let sUrl = location.origin;
    if (userInfoData.boolen === "1") {
      sUrl += '/waploan/html/#!/mianxiDetail?mobile='+userInfoData.data.mobile + '&fullscreen=true&newapp=true';
    } else {
      sUrl += '/waploan/html/#!/mianxiDetail?fullscreen=true&newapp=true';
    }
    
    window.location.href = sUrl;

    yield put( AppActions.doAction('HIDE_LOADING') );
  }
}