import Func from './vendor/lib/src';

import marked from 'marked';
import hljs from './vendor/lib/src/highlight/highlight';
import moment from 'moment';

//无限分类赋值
const storeClassification = function (object, dir, value, index = 0) {
    if (index == 0 && dir.length == 1) {
        object['./'][dir[0]] = value;
    } else {
        object[dir[index]] = !object.hasOwnProperty(dir[index]) ? {} : object[dir[index]];
        index == dir.length - 1
        ? object[dir[index]] = value
        : storeClassification(object[dir[index]], dir, value, index + 1)
    }
}
//无限分类读取
const readClassification = function (object, dir, index = 0) {
    if (dir.length == index) {
        return object;
    } else {
        return readClassification(object[dir[index]], dir, index + 1);
    }
}
//渲染md为html
const parseMarkdown = function (md, config) {
    if (Func.empty(md)) {
        md = '';
    }

    if (Func.empty(config)) {
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
    return marked(md);
}

const formatTime = function (time) {
    return moment.unix(time).format('MM 月 DD 日 YYYY 年');
}

export default {
    formatTime: formatTime,
    parseMarkdown: parseMarkdown,
    storeClassification: storeClassification,
    readClassification: readClassification,
}