import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { IntlProvider, addLocaleData } from 'react-intl';
import zhCN from './lib/langConfig/zh-CN.js';  //导入 i18n 配置文件,需要手动创建并填入语言转换信息
import ptBR from './lib/langConfig/pt-BR.js';
import pt from 'react-intl/locale-data/pt';
import zh from 'react-intl/locale-data/zh';


import { syncHistoryWithStore } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';

import configureStore from './store/configureStore';

import rootSaga from './sagas';

import routes from './routers';
import './../style/reset.css';
import './../style/global.css';
import {KeyboardUtil} from './lib/heightChange';

import bridge from './lib/bridge';

var areIntlLocalesSupported = require('intl-locales-supported');
KeyboardUtil.FixAndroidKeyBoardHideInput();


var localesMyAppSupports = [
    /* list locales here */
];

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and replace the constructors with need with the polyfill's.
        var IntlPolyfill = require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}

addLocaleData([...pt, ...zh]);

const store = configureStore();
const langMap = {
    'zh': zhCN,
    'pt': ptBR
};
store.runSaga(rootSaga);

let locale = 'pt';
function chooseLocale(){
	if (navigator.language.split('_')[0] === 'zh-CN') {
		locale = "zh"
	}
}
chooseLocale()

const history = syncHistoryWithStore(browserHistory, store);
const target = document.getElementById('root');

let callBack = (data) => {
	window.sessionStorage.setItem('usrInfo', data);
	// console.log(data,'data');
	setTimeout(() => {
		ReactDOM.render(
			<IntlProvider locale={locale} messages={langMap[locale]}>
				<Provider store={store}>
					<Router history={history} routes={routes}></Router>
				</Provider>
			</IntlProvider>
			,
			target
		)
	}, 0);
}
bridge.getUserLoginInfo(null, callBack);
if (bridge.clientType === 'browser') {
		ReactDOM.render(
			<IntlProvider locale={locale} messages={langMap[locale]}>
				<Provider store={store}>
					<Router history={history} routes={routes}></Router>
				</Provider>
			</IntlProvider>
			,
			target
		)
}