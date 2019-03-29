import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { get } from './../../lib/fetch';

import serviceApi from './../../api';

export function getCodeFetch(param) {
    return get(serviceApi.escrowHost + serviceApi.sendEmailCode+"/"+param['email']+"/0", {
        body:''
    });
}

export default function *sendEmailCode() {
    while (true) {

        const { param } = yield take('SEND_EMAIL_CODE')

        yield put( AppActions.doAction('SHOW_LOADING') )

        const checkDataObj = yield call(getCodeFetch, param);
        const checkDataObjData = checkDataObj.data;
        console.log(checkDataObjData)
        if (checkDataObjData.success) {
            yield put( AppActions.doAction('EMAIL_CODE_FETCH', {canStartCutDown: checkDataObjData.success}) );
            yield put( AppActions.doAction('TOAST', "Sucesso de enviar código") )
        }else{
            yield put( AppActions.doAction('TOAST', checkDataObjData.message) )
        }

        yield put( AppActions.doAction('HIDE_LOADING') );

    }
}