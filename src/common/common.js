//加载依赖模块
import marked from 'marked';
import hljs from '../lib/highlight/highlight';
import sha1 from '../lib/sha1';
import moment from 'moment';

/*
 * @description: Common接口类，提供各种通用方法函数
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Common {
    //生成month day格式的当前日期
    static date () {
        const monthArr = ['January ', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const cT = new Date();
        const month = monthArr[cT.getMonth()];
        let day = cT.getDate() + '';
        const lastIndexOfDay = day.charAt(day.length - 1);
        if (day == '11' || day == '12' || day == '13') {
            day = day + 'th';
        } else {
            switch (lastIndexOfDay) {
                case '1':
                    day = day + 'st';
                break;
                case '2':
                    day = day + 'nd';
                break
                case '3':
                    day = day + 'rd';
                break;
                default :
                    day = day + 'th';
                break;
            }
        }
        return month + ' ' + day;
    }
    //判断变量是否为空，包括各种意义上的空白符均被认为是空
    static empty (param) {
        if (typeof param == 'object') {
            return param.length == 0 ? true : false;
        }
        switch (param) {
            case Infinity:
            case -Infinity:
            return true;
            break;
        }
        if (!param) {
            return true;
        }
        if (typeof param == 'boolean') {
            return true;
        }
        if (typeof param == 'number') {
            return false;
        }
        param = param.replace(/[ ]|\n|\r/gi, '');
        if (param == '') {
            return true;
        }
        return false;
        
    }
    //生成版本号
    static createVersion (code) {
        code = escape(code).replace(/%u/gi, '\\u');
        code = unescape(code);
        return sha1(code);
    }
    //转化时间为m d Y格式
    static formatTime (time) {
        return moment.unix(time).format('MM 月 DD 日 YYYY 年');
    }
    //渲染md为html
    static parseMarkdown (md, config) {
        if (Common.empty(config)) {
            config = {
                highlight: (code) => {
                    return hljs.highlightAuto(code).value
                },
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: true,
                pedantic: false,
                sanitize: true,
                smartLists: true,
                smartypants: false
            };
        }
        marked.setOptions(config);
        if (Common.empty(md)) {
            md = '';
        }
        return marked(md);
    }
    //首字母大写
    static ucfirst (str) {
        const charFirst = str.charAt(0);
        if (/[A-Za-z]/g.test(charFirst)) {
            return str.replace(charFirst, charFirst.toUpperCase(0));
        }
        return false;
    }
}

export default Common;
