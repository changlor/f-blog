'use strict';

import store from './store.js';
import api from '../lib/config/api.js';
import constants from '../lib/config/constants.js';
import common from '../common/common.js';

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
            category: init.category,
        };
        this.status = {
            isStored: store.isExist(init.storeKey),
        },
        this.version = {
            post: common.sha1(store.read('id-' + init.postId)),
            category: common.sha1(store.read(init.category)),
        };
        this.store = {
            post: store.readPost(init.postId),
        }
    }
}

export default Config;
