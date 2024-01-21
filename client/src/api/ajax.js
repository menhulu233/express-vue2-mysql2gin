import axios from 'axios'
import Qs from 'qs'

export default function ajax(url = '', params = {}, type = 'GET', contentType = 'form') {
  // 1. 定义promise对象
  let promise;
  return new Promise((resolve, reject) => {
    // 2. 判断请求的方式
    if ('GET' === type.toUpperCase()) {
      // 2.1 拼接请求字符串
      let paramsStr = '';
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&'
      });
      // 2.2 过滤最后的&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'))
      }
      // 2.3 完整路径
      url += '?' + paramsStr;
      // 2.4 发送get请求
      promise = axios.get(url)
    } else if ('POST' === type.toUpperCase()) {
      if ('form' === contentType.toLowerCase()) {
        promise = axios.post(url, Qs.stringify(params), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      } else if ('json' === contentType.toLowerCase()) {
        promise = axios.post(url, JSON.stringify(params), {headers: {'Content-Type': 'application/json'}})
      } else if ('file' === contentType.toLowerCase()) {
        promise = axios.post(url, params, {headers: {'Content-Type': 'application/form-data'}})
      } else {
        promise = axios.post(url, params)
      }
    }
    // 3. 返回请求的结果
    promise.then((response) => {
      resolve(response.data);
    }).catch(error => {
      reject(error)
    })
  })
}
