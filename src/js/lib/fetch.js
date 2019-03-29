import fetch from 'isomorphic-fetch';
import bridge from './bridge';
import utils from './utils';

function getUserInfo(){
  let userinfo = JSON.parse(window.sessionStorage.getItem('usrInfo'));
  if (userinfo  && userinfo !== 'undefined' && utils.isEmptyObject(userinfo)) {
    let headers = {
      "pm-uid": userinfo.data.id,
      "pm-token": userinfo.data.token,
      "pm-osdevice": userinfo.deviceId,
      "pm-appversion":userinfo.appversion
    }
    return headers
  }else{
    return {}
  }

}


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  console.log(response.status);
  if (response.status === 401) {
    bridge.goLogin();
    return false;
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => {
      return {data}
    })
    .catch(error => ({ error }));
}

function transParams(obj) {
  var result = '';

  for (let key in obj) {
    let str = result ? '&' : '';
    result += str + key + '=' + obj[key];
  }

  return result;
}

function post(url, options={}) {
  let userHeade = getUserInfo();
  let defaultOpts = {
    method: 'post',
    headers: {
      "Content-Type": "application/json",
      ...userHeade
    },
    credentials: 'include'
  }
  console.log(defaultOpts.headers,"headers");
  // defaultOpts.headers['pm-uid'] = 100127
  let opts;

  if (url instanceof Array) {
    var promises = url.map( (item) => {
      let tmpOpt = {};
      item.body && (tmpOpt.body = JSON.stringify(item.body));
      opts = Object.assign(defaultOpts, tmpOpt);

      return request(item.api, opts);
    });

    return Promise.all(promises);
  } else {
    options.body && (options.body = JSON.stringify(options.body));
    opts = Object.assign(defaultOpts, options);
    return request(url, opts);
  }
}

function get(url, options) {
  let userHeade = getUserInfo();
  let defaultOpts = {
    method: 'get',
    credentials: 'include',
    headers: {
      ...userHeade,
    }
  }
  // defaultOpts.headers['pm-uid'] = 100127

  let opts = Object.assign(defaultOpts, {});

  if (url instanceof Array) {
    var promises = url.map( (item) => {
      return request(item.api, opts);
    });

    return Promise.all(promises);
  } else {
    if(options.body){
        url = url + "?" + transParams(options.body)
    }
    return request(url, opts);
  }
}

export {
  request,
  post,
  get
}