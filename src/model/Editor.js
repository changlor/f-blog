'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
//Editor模型类
class Editor {
    //return [array] res --返回本地草稿
    static getDraft (input, callback) {
        //获取数据
        const res = Parent.read('draft');
        //回调数据
        callback(res);
    }

    //param [array] input --包括两个个参数
    //param [string] title   --草稿文章的标题
    //param [string] content --草稿文章的正文
    //return [boolean] res --保存与否的状态
    static storeDraft (input, callback) {
        //获取所需的变量
        const draft = {};
        [draft.title, draft.content] = [
            input.title,
            input.content
        ];
        //保存数据
        Parent.store('draft', draft);
        //回调数据
        callback();
    }
}

export default Editor;