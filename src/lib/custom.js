import Func from './lib/';

import marked from 'marked';
import hljs from './lib/highlight/highlight';

//渲染md为html
const parseMarkdown = function (md) {
    const config = {
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
    marked.setOptions(config);
    return marked(md);
}

export default {
    parseMarkdown:parseMarkdown,
}