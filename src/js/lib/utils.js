import {
  RegGroup
} from './reg';

export default {
  money(val) {
    let str = val.toString();
    if (str.indexOf(",") > -1) {
        return val;
    }
    if (str.indexOf(".") === -1) {
        str = val.toFixed(2).toString()
    }
    let intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
    let dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
    let ret = intSum + dot;
    ret = ret.replace('.', '>') ;
    ret = ret.replace(',', '.') ;
    ret = ret.replace('>', ',') ;
    return ret;
  },
  // 验证手机
  validMobile(val) {
    var re = /^[1][3,4,5,6,7,8,9]\d{9}$/;
    var result = val.toString().match(re) ? true : false;
    return result;
  },
  // 验证密码
  validPass(val) {
    return RegGroup.passValid(val);
  },
  zero(n) {
    let _n = parseInt(n, 10);
    if (_n > 0) {
      if (_n <= 9) {
        _n = "0" + _n
      }
      return String(_n);
    } else {
      return "00";
    }
  },
  haomiao(n) {
    if (n < 10) return "0" + n.toString();
    if (n < 100) return n.toString();
  },
  method: {
    y: function (d) {
      return d.getFullYear()
    },
    M: function (d) {
      return d.getMonth() + 1
    },
    d: function (d) {
      return d.getDate()
    },
    H: function (d, halfMode) {
      var val = d.getHours();
      return halfMode ? val % 12 : val;
    },
    h: function (d) {
      return this.method.H(d, true)
    },
    m: function (d) {
      return d.getMinutes();
    },
    s: function (d) {
      return d.getSeconds();
    },
    w: (function () {
      var WeekName = ['日', '一', '二', '三', '四', '五', '六'];
      return function (d) {
        return WeekName[d.getDay()]
      }
    })()
  },
  formatDate(oDate, sFormation) {
    var _this = this;
    if (sFormation && oDate && !isNaN(oDate.getTime())) {
      return sFormation.replace(/y+|M+|d+|H+|h+|m+|s+|w+/g, function (found) {
        var getter = _this.method[found[0]],
          val = getter && getter.call(_this, oDate);
        return found.length === 2 ? ("0" + val).slice(-2) : "" + val;
      });
    } else {
      return "";
    }
  },
  formatTime(time) {
    let dur = time / 1000,
      pms = {
        hm: "00",
        sec: "00",
        mini: "00",
        hour: "00"
      };

    pms.hm = this.haomiao(Math.floor(dur * 1000 % 1000 / 10));
    pms.sec = this.zero(Math.floor(dur % 60));
    pms.mini = Math.floor((dur / 60)) > 0 ? this.zero(Math.floor((dur / 60)) % 60) : "00";
    pms.hour = Math.floor((dur / 3600)) > 0 ? this.zero(Math.floor((dur / 3600)) % 24) : "00";
    return pms;
  },
  getParam(key) {
    let data;

    try {
      data = localStorage.getItem(key);
      data = data && JSON.parse(data);
    } catch (e) {
      data = localStorage.getItem(key);
    }

    return data || '';
  },
  setParam(key, val) {
    let value = (typeof val === "string") ? val : JSON.stringify(val);
    if (key) {
      localStorage.setItem(key, value);
    }
  },
  starMobile(mobile) {
    let re = /(\d{3})(\d{4})(\d{4})/;
    let result;
    result = mobile.replace(re, '$1****$3');
    return result;
  },
  setCookie(sName, sValue, path, sExpires, domain) {
    var sDomain = '';
    var sPath = "";
    var sCookie = sName + "=" + encodeURIComponent(sValue);
    if (domain) {
      sDomain = ";domain=" + domain;
    }
    if (path) {
      sPath = ";path=" + path;
    }
    var sTime = new Date();
    sTime.setTime(sTime.getTime() + sExpires * 24 * 60 * 60 * 1000);
    if (sExpires != null) {
      sCookie += sDomain + "; expires=" + sTime.toGMTString();
    } else {
      sCookie += sDomain;
    }

    sCookie += sPath;

    document.cookie = sCookie;
  },
  getUrlParams(url) {
    var _url = url || window.location.href;
    var index = _url.indexOf('?');
    var params = {};
    var reg = /\?/g;
    if (_url.match(reg)) {
      var question_mark_count = _url.match(reg).length; //url中的问号数量
      if (question_mark_count > 1) {
        index = _url.lastIndexOf('?');
      }
    }
    if (index !== -1) {
      var paramsStr = _url.slice(index + 1); // 获取到问号以后的字符串
      var paramsArr = paramsStr.split('&');
      // 把url上的所有参数塞到json对象中,以键值对的方式保存
      for (var i = 0, length = paramsArr.length, param; i < length; i++) {
        param = paramsArr[i].split('=');
        params[param[0]] = param[1]
      }
    }
    return params;
  },
  WheelDegCalc(total, current) {
    if (typeof total !== 'number' || total < 1) throw new Error('参数范围错误！')
    this._total = total;
    this._current = typeof current === 'number' ? current : 0;
    this._deg_offset = 0;
    this._deg_step = 360 / total;
    this.getCurrentIndex = function () {
      return this._current;
    }
    this.getTotal = function () {
      return this._total;
    }
    this.getCurrentDeg = function () {
      return this._deg_offset;
    }
    this.pointToIndex = function (index) {
      if (typeof index !== 'number') throw new Error('输入参数错误！');
      if (index < 0 || index >= total) throw new Error('输入的序号无效');
      // 计算角度
      // 1. 归位
      var mod_deg = 360 - (this._deg_offset % 360);
      // 2. 运动
      var run_deg = 360 * 5;
      // 3. 定位
      var stop_deg = this._deg_step * index;

      var total_deg = mod_deg + run_deg + stop_deg;
      this._deg_offset = this._deg_offset + total_deg;
      return this._deg_offset;
    }
  },
  //获取随机整数
  getRan(min, max) {
    //min随机最小值  max随机最大值
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  formateNumToTime(num) {
    if (isNaN(num)) throw new Error('输入参数错误！');
    let time = Number(num);
    if (time < 60) {
      return time + ' Segundo'
    } else if (time === 60) {
      return '1 Minuto'
    } else {
      time = parseInt((time / 60), 0)
      return time + ' Minuto'
    }
  },
  isEmptyObject(obj) {
    for (var key in obj) {
      return true
    };
    return false
  },
  getUserLoginInfo(){
    let userinfo = JSON.parse(window.sessionStorage.getItem('usrInfo'));
    if (userinfo  && userinfo !== 'undefined') {
      return userinfo.data
    }
  }
}