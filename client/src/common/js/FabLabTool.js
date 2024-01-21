//引入检测敏感词汇方法
import FastScanner from 'fastscan'
//引入敏感词汇数组
import zhengzhi from './filterKeyword/zhengzhi'
import zhengfu from './filterKeyword/zhengfu'
import seqing from './filterKeyword/seqing'
import xiejiao from './filterKeyword/xiejiao'

class TabLabTool {
  constructor() {
    this.scanner = null; //过滤敏感词汇对象
  }

  /**
   * 本地图片转base64
   * @param file
   * @param callback
   */
  srcToBase64Url(file, callback) {
    //修改图片信息
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
    }
    //阅读器解析完毕
    reader.onloadend = () =>{
      callback(reader.result);
    };
  }

  /**
   * 媒体文件转本地预览地址
   * @param file
   * @param callback
   */
  mediaToUrl(file,callback){
    callback(file ? URL.createObjectURL(file) : '');
  }

  /**
   * 复制指定内容
   * @param content 复制的内容
   * @param callback 回调函数
   */
  copyContent(content, callback) {
    let copyTextareaBox = document.createElement('textarea');
    copyTextareaBox.value = content;
    document.body.appendChild(copyTextareaBox);
    copyTextareaBox.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    copyTextareaBox.className = 'Input';
    copyTextareaBox.style.display = 'none';
    callback && callback();
  }

  /**
   * 检测敏感词汇
   * @param content
   * @returns {{offWords: *, hits: {}}}
   */
  filterWords(content) {
    this.scanner = this.scanner || new FastScanner([...xiejiao, ...seqing, ...zhengfu, ...zhengzhi]);
    let offWords = this.scanner.search(content);//查询匹配的词汇以及所在字符串的位置
    let hits = this.scanner.hits(content);//查询匹配词汇的命中数量
    return {
      offWords, hits
    }
  }
}

export default TabLabTool;
