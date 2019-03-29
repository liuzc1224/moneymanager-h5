import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { post } from './../../lib/fetch';

import serviceApi from './../../api';

export function registerFetch(param) {
  return post(serviceApi.escrowHost + serviceApi.register, {
    body: param
  });
}

export default function *doRegiser() {
  while (true) {

    const { param } = yield take('DO_REGISTER')

    yield put( AppActions.doAction('SHOW_LOADING') )

    const registerDataObj = yield call(registerFetch, param);
    const registerDataObjData = registerDataObj.data;

    if (registerDataObjData.success) {
        // utils.setCookie('userLoginInfo', registerDataObjData.data, '/');
        window.sessionStorage.setItem('userLoginInfo', JSON.stringify(registerDataObjData.data));
        window.location.href = '/firstProm' ;
        console.log('注册成功，跳转活动页面');
    }else{
        yield put( AppActions.doAction('TOAST', registerDataObjData.message) )
    }

    yield put( AppActions.doAction('HIDE_LOADING') );
  }
}