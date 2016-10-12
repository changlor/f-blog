'use strict';

import base from './Base.js';
import Api from '../common/api.js';

const Parent = new base();

class Editor {
    static fetchDraft (input, callback) {
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