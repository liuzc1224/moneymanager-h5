var clientType,isAppClient;
var cookie = document.cookie;
var ua = window.navigator.userAgent.toLowerCase();
var Bridge = {};

if (ua.match(/ua_ps_ios/i) || cookie.match(/PSClient=ios/i)) {
  clientType = 'ios';
  isAppClient = true;
} else if (ua.match(/ua_ps_android/i) || cookie.match(/PSClient=android/i)) {
  clientType = 'android';
  isAppClient = true;
} else {
  clientType = 'browser';
  isAppClient = false;
}

function setupWebViewJavascriptBridge(callback) {

  //Android使用
  if (window.WebViewJavascriptBridge) {
    return callback(window['WebViewJavascriptBridge'])
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function () {
        callback(window['WebViewJavascriptBridge'])
      },
      false
    );
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window['WVJBCallbacks'] = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

function commonCallHandler(action, data, callBack) {
  setupWebViewJavascriptBridge(function (bridge) {

    bridge.callHandler(action, JSON.stringify(data), callBack);

  })
}

//注册回调方法
// function commonRegisterHandler(action, callBack) {
//   setupWebViewJavascriptBridge(function (bridge) {
//     bridge.registerHandler(action, function (data, responseCallback) {
//       window[action](data)
//       callBack(data)
//       responseCallback("success")
//     })

//   })
// }


//去登录
Bridge.goLogin = function (data = {}, callBack) {
  commonCallHandler('goLogin', data, callBack)
}

//设置头部右边按钮Bridge.setTitleBarRight("submit")
Bridge.setTitleBarRight = function ( fnName="", callBack ) {
  commonCallHandler('setTitleBarRight', fnName, callBack)
}

//新开webview
Bridge.newWeb = function (url = "", callBack) {
  commonCallHandler('newWeb', url, callBack)
}

//返回上一页
Bridge.goBack = function (data = {}, callBack) {
  commonCallHandler('goBack', data, callBack)
}

//获取用户登录信息
Bridge.getUserLoginInfo = function (data = {}, callBack) {
  commonCallHandler('getUserLoginInfo', data, callBack)
}

//跳转个人中心
Bridge.goMyCenter = function (data = {}, callBack) {
  commonCallHandler('goMyCenter', data, callBack)
}

//跳转绑定手机号界面
Bridge.goSetPhoneNum = function (data = {}, callBack) {
  commonCallHandler('goSetPhoneNum', data, callBack)
}

//去除提交
Bridge.removeSubmit = function (data = {}, callBack) {
    commonCallHandler('removeSubmit', data, callBack)
}

//前往问题反馈
Bridge.goFeedback = function (data = {}, callBack) {
    commonCallHandler('goFeedback', data, callBack)
}

//关闭新开页面后回到当前页刷新当前方法
Bridge.displayReload = function (reloadFunc = "", callBack) {
  commonCallHandler('displayReload', reloadFunc, callBack)
}

export default {
  clientType: clientType,
  isAppClient: isAppClient,
  ...Bridge
}