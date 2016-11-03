//判断变量是否为空，包括各种意义上的空白符均被认为是空
const empty = function (param) {
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
    return false;
}
//首字母大写
const ucfirst = function (str) {
    const charFirst = str.charAt(0);
    if (/[A-Za-z]/g.test(charFirst)) {
        return str.replace(charFirst, charFirst.toUpperCase(0));
    }
    return false;
}

export default {
    empty: empty,
    ucfirst: ucfirst,
};