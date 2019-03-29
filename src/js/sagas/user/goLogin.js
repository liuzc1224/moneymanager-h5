import { take } from 'redux-saga/effects';

import bridge from './../../lib/bridge';

export default function *goLogin() {
  while (true) {
  	yield take('GO_LOGIN');
    bridge.goLogin();
  }
}