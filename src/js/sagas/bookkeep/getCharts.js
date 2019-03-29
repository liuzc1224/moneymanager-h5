import { take, put, call } from 'redux-saga/effects';
import * as AppActions from '../../actions/AppActions';
import { get } from './../../lib/fetch';

import serviceApi from './../../api';

export function getChartsFetch(param) {
  return get(serviceApi.escrowHost + serviceApi.getCharts, {
      body: param
  });
}

export default function *getCharts() {
  while (true) {

    const { param } = yield take('GET_CHARTS')

    yield put( AppActions.doAction('SHOW_LOADING') )

    const dataObj = yield call(getChartsFetch, param);
    const dataObjData = dataObj.data;

    if (dataObjData && dataObjData.success) {
        yield put( AppActions.doAction('CHART_INFO_FETCH', dataObjData.data) )
    }else{
        yield put( AppActions.doAction('TOAST', dataObjData && dataObjData.message) )
    }

    yield put( AppActions.doAction('HIDE_LOADING') );

  }
}