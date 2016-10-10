'use strict';

import Fetch from '../common/fetch.js';
import Store from '../common/store.js';
import Common from '../common/common.js';

/*
 * 注册公共函数
 */
const empty = Common.empty;

/*
 * 注册通信函数
 */
const get = Fetch.getData;
const post = Fetch.postData;

/*
 * 注册本地缓存函数
 */
 const read = Store.readJson;
 const store = Store.storeJson;

class Base {
    constructor() {
        //common func
        [this.empty] = [empty];
        //comunication func
        [this.get, this.post] = [get, post];
        //store func
        [this.read, this.store] = [read, store];
    }
}

export default Base;