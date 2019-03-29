import { fork } from 'redux-saga/effects';
//sys
import setToast from './setToast';

//register
import checkMobile from './register/checkMobile';
import doRegister from './register/doRegister';
import sendRegisterCode from './register/sendRegisterCode';

//orderDetail
import getOneCard from './orderDetail/getOneCard';
import getBill from './orderDetail/getBill';

//boolkeep
import getCharts from './bookkeep/getCharts';

//cpf
import seachCredit from './cradit/seachCredit';
//H5registration
import checkEmail from './H5registration/checkEmail'
import doCadastrar from './H5registration/doCadastrar'
import sendEmailCode from './H5registration/sendEmailCode'


export default function *rootSaga() {
  yield fork(checkMobile);
  yield fork(sendRegisterCode);
  yield fork(doRegister);
  yield fork(getOneCard);
  yield fork(getBill);
  yield fork(getCharts);
  yield fork(seachCredit);
  yield fork(setToast);

  yield fork(checkEmail);
  yield fork(doCadastrar);
  yield fork(sendEmailCode);

}