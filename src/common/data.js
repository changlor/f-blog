'use strict';

import store from './store.js';
import api from '../lib/config/api.js';
import constants from '../lib/config/constants.js';

//获取常量
const [host] = [api.testHost];
const [categories] = [constants.categories];
//获取变量
const [token] = [store.read('Token')];

class Config {
    constructor(init) {
        this.constants = {
            host: host,
            categories: categories,
        },
        this.params = {
            token: token,
            host: host,
            postId: init.postId,
            categoryId: init.categoryId,
        };
        this.status = {
            isStored: store.isExist(init.storeKey),
        },
        this.version = {
            //post: store.read(init.postId),
            //category: store.read(init.categoryId),
        };
        this.store = {
            post: store.readPost(init.postId),
        }
    }
}

export default Config;
