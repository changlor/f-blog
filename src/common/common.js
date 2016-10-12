import sha1 from '../lib/sha1.js';

class commonApi {
    static getCurrentDate () {
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
        param = param.replace(/[ ]|\n|\r/gi, '');
        if (param == '') {
            return true;
        }
        return false;
        
    }

    static sha1 (code) {
        code = escape(code).replace(/%u/gi, '\\u');
        code = unescape(code);
        return sha1(code);
    }
}

export default commonApi;
