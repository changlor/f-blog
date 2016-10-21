//加载依赖模块
import sha1 from '../lib/sha1';

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
}

export default Common;
