'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
import Api from '../common/api.js';

class Category {
    static getStoredCategory (input, callback) {
        const [category] = [input.category];
        const res = Parent.read(category);
        callback(res);
    }
}

export default Category;