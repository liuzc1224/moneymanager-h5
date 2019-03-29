
import { take, put, call, select, fork } from 'redux-saga/effects';
import * as AppActions from '../actions/AppActions';

let key = 0;
const duration = 1500; // ms
const delay = (duration) => new Promise((res,rej) => setTimeout(() => res(), duration));

/**
 * action：
 * {action:'TOAST', param: '非法操作！'}
 */

export default function *setToast(){
    while(true){
        const { param } = yield take('TOAST');
        if (param) {
            yield fork(toast, param);
        }
    }
}

function *toast(param){
    const currentKey = key++;
    const prevList1 = yield select((state) => state.toastReducer.list);
    const list1 = prevList1.concat([{ key: currentKey, content: param }]);
    yield put(
        AppActions.doAction('UPDATE_TOAST_LIST', {list: list1})
    );

    yield call(delay, duration);

    const prevList2 = yield select((state) => state.toastReducer.list);
    const list2 = prevList2.filter((item) => item.key !== currentKey);
    yield put(
        AppActions.doAction('UPDATE_TOAST_LIST', {list: list2})
    );
}