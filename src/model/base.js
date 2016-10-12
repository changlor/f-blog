'use strict';
//读取依赖
import Fetch from '../common/fetch.js';
import Store from '../common/store.js';
import Common from '../common/common.js';
//注册公共函数
const empty = Common.empty;
//注册通信函数
const post = Fetch.post;
const put = Fetch.put;
const get = Fetch.get;
//注册本地缓存函数
const read = Store.readJson;
const store = Store.storeJson;
//Base模型类
class Base {
    constructor() {
        //公共函数
        [this.empty] = [empty];
        //通信函数
        [this.get, this.post, this.put] = [get, post, put];
        //本地缓存函数
        [this.read, this.store] = [read, store];
    }
}

export default Base;