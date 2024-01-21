/**
 * 检查邮箱
 * @param val
 * @returns {boolean}
 */
export function check_email(val) {
  // eslint-disable-next-line no-useless-escape
  return (/^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/.test(val));
}

/**
 * 检查网址
 * @param val
 * @returns {boolean}
 */
export function check_url(val) {
  return (/^((ht|f)tps?):\/\/([\w-]+(\.[\w-]+)*\/?)+(\?([\w\-.,@?^=%&:/~+#]*)+)?$/.test(val));
}

/**
 * 去空格
 * @param v
 * @returns {*}
 */
export function trim(v) {
  return v.replace(/^\s*|\s*$/g, "")
}
/**
 * 检查密码【6-16位由数字字母符号至少两种组成】
 * @param val
 * @returns {boolean}
 */
export function check_pass(val) {
  let value = val.replace(/^\s*|\s*$/g,"");
  let value_length = value.length;
  let code_length = 0;
  if (/[\d]/.test(value)) {
    code_length++;
  }
  if (/[a-zA-Z]/.test(value)) {
    code_length++;
  }
  if (/[^\w]/.test(value)) {
    code_length++;
  }
  return value_length >= 6 && value_length <= 16 && !/\s/.test(value) && code_length >= 2;
}

/**
 * 检查姓名
 * @param val
 * @returns {boolean}
 */
export function check_name(val) {
  return (/^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])+$/.test(val));
}

/**
 * 检查手机号
 * @param phone
 * @returns {boolean}
 */
export function check_phone(phone) {
  let pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])[0-9]{8}$/;
  return pattern.test(phone)
}

/**
 * 检查身份证号
 * @returns {boolean}
 * @param id_cord
 */
export function check_id_cord(id_cord) {
  let pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return pattern.test(id_cord)
}

/**
 * 求余数
 * @param a
 * @param b
 * @returns {number}
 */
export function residue(a, b) {
  return a % b === 0 ? b : a % b;
}

/**
 * 随机验证码
 * @param length
 * @returns {string}
 */
export function getCode(length) {
  let codeArr = [1, 3, 4, 2, 6, 7, 5, 9, 8, 0];
  let codeLength = length;
  let code = '';
  for (let i = 0; i < codeLength; i++) {
    code += codeArr[parseInt(Math.random() * codeArr.length)];
  }
  return code;
}

/**
 *  时间戳转换为时间date
 * @param shijianchuo
 * @returns {string}
 */
export function formatTime(shijianchuo) {
  function add0(m) {
    return m < 10 ? '0' + m : m
  }

  let time = new Date(shijianchuo);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  return y + '-' + add0(m) + '-' + add0(d);
}

/**
 * 计算两个时间段的差值
 * @param remDate
 * @param curDate
 * @returns {{hour: number, day: number, minute: number, second: number}}
 */
export function getDiffer(remDate, curDate = new Date()) {
  //1.得到两个时间之间的差值（毫秒）
  let differTime = remDate - curDate;
  //2.得到两个时间之间的差值（秒）
  let differSecond = differTime / 1000;
  //3.利用相差的总毫秒数/每一天的秒数 = 相差的天数
  let day = Math.floor(differSecond / (60 * 60 * 24));
  day = day >= 10 ? day : '0' + day;
  let timeObj = secondToTime(differSecond);
  return {
    day,
    ...timeObj
  }
}

/**
 * 秒数转小时-分钟-秒数
 * @param time
 * @returns {{hour: number, minute: number, second: number}}
 */
export function secondToTime(time) {
  //1.利用总秒数/小时 % 24
  let hour = Math.floor(time / (60 * 60) % 24);
  hour = hour >= 10 ? hour : '0' + hour;
  //2.利用总秒数/分钟 %60
  let minute = Math.floor(time / 60 % 60);
  minute = minute >= 10 ? minute : '0' + minute;
  //3.利用总秒数%秒数
  let second = Math.floor(time % 60);
  second = second >= 10 ? second : '0' + second;
  return {
    hour, minute, second
  }
}

/**
 * 随机产生规定范围内的随机数
 * @param min 最小值
 * @param max 最大值
 */
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 防抖函数【连续调用10次，只会执行一次】
 * @param fn
 * @param delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
  let timerId = null;
  return function () {
    let self = this;
    let args = arguments;
    timerId && clearTimeout(timerId);
    timerId = setTimeout(function () {
      fn.apply(self, args);
    }, delay || 1000);
  }
}

/**
 * 函数节流【连续调用10次，可能执行3-4次】
 * @param {Function}fn
 * @param {Number}delay
 * @returns {Function}
 */
export function throttle(fn, delay) {
  let timerId = null;
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    let self = this;
    let args = arguments;
    timerId && clearTimeout(timerId);
    timerId = setTimeout(function () {
      flag = true;
      fn.apply(self, args);
    }, delay || 1000);
  }
}

/**
 * 视频全屏
 * @param videoDom
 * @returns {*}
 */
export function toFullVideo(videoDom) {
  if (videoDom.requestFullscreen) {
    return videoDom.requestFullscreen();
  } else if (videoDom.webkitRequestFullScreen) {
    return videoDom.webkitRequestFullScreen();
  } else if (videoDom.mozRequestFullScreen) {
    return videoDom.mozRequestFullScreen();
  } else {
    return videoDom.msRequestFullscreen();
  }
}

/**
 * 退出全屏
 */
export function exitFullscreen() {
  if (document.exitFullScreen) {
    document.exitFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
    // eslint-disable-next-line no-undef
  } else if (element.msExitFullscreen) {
    // eslint-disable-next-line no-undef
    element.msExitFullscreen();
  }
}

/**
 * 检查是否是全屏
 * @returns {boolean | *}
 */
export function checkFull() {
  return document.fullScreenElement//W3C
    || document.msFullscreenElement //IE
    || document.mozFullScreenElement //火狐
    || document.webkitFullscreenElement //谷歌
    || false;
}

/**
 * 获取某区域选中内容
 * @param {Object}obj
 * @param {Function}callback
 */
export function getSelectWord(obj, callback) {
  // eslint-disable-next-line no-unused-vars
  obj.addEventListener('mouseup', (e) => {
    e = e || window.event;
    callback && callback(window.getSelection ? window.getSelection().toString() : document.selection.createRange().text);
  });
}

/**
 * 获取标签css
 * @param {Object}obj
 * @param {String}attr
 * @returns {*}
 */
export function getCss(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : window.getComputedStyle(obj, null)[attr];
}

/**
 * 深拷贝对象
 * @param {Object}target
 * @param {Object}source
 */
export function deepCopy(target, source) {
  for (let key in source) {
    let sourceValue = source[key];
    if (sourceValue instanceof Object) {
      if (sourceValue.constructor.name === 'File') {
        target[key] = null
      } else {
        let subTarget = new sourceValue.constructor;
        target[key] = subTarget;
        deepCopy(subTarget, sourceValue);
      }
    } else {
      target[key] = sourceValue;
    }
  }
}
/**
 * 删除对象数组中指定的属性
 * @param {Array}objArr
 * @param {Array}keyArr
 */
export function deleteObjArrKey(objArr, keyArr) {
  objArr.forEach(value => {
    keyArr.forEach(value1 => {
      delete value[value1];
    })
  });
}

/**
 * 将img标签转换为【图片】
 * @param {string} str
 */
export function replaceImg(str){
  if(typeof str === 'string'){
    str = str.replace(/<img(.*?)>/g, "[图片]")
  }
  return str
}

/**
 * 将html转成text
 * @param content
 * @returns {string}
 */
export function dealHtml(content) {
  let div = document.createElement("div");
  div.innerHTML = content;
  let output = div.innerText || div.textContent;
  div = null;
  return output;
}

/**
 * 获取css属性
 * @param obj
 * @param attr
 * @returns {string}
 */
export function getStyleAttr(obj, attr) {
  if (obj.currentStyle) { // IE 和 opera
    return obj.currentStyle[attr];
  } else {
    return window.getComputedStyle(obj, null)[attr];
  }
}
