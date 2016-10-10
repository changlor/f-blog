'use strict';

import base from './base.js';
import Api from '../common/api.js';

const Parent = new base();

class category {
    static fetchStoredCategory (input, callback) {
        const [category] = [input.category];
        const res = Parent.read(category);
        callback({ category:res });
    }
}

export default category;