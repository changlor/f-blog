'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
//Editor模型类
class Editor {
    static getDraft (input, callback) {
        const res = Parent.read('draft');
        callback({ title:res.title, content:res.content });
    }

    static storeDraft (input, callback) {
        const draft = {};
        [draft.title, draft.content] = [input.title, input.content];
        Parent.store('draft', draft);
        callback();
    }
}

export default Editor;