'use strict';
//读取依赖
import data from './data.js';
import fetch from '../lib/fetch.js';
import store from './store.js';
//--初始化变量
const setting = new data({});
//--配置基础变量
const host = setting.params.host;
const token = setting.params.token;
//--注册类库函数
const post = fetch.post;
const put = fetch.put;
const get = fetch.get;
//Fetch工具类
class Fetch {
    static post (uri, params, callback) {
        //设置header
        let headers = new Headers();
        //post操作需要权限，因而需要在header添加token
        headers.append('Auth-Token', token);
        //发送请求
        post(host + uri, headers, params, callback);
    }

    static put (uri, params, callback) {
        //设置header
        let headers = new Headers();
        //put操作需要权限并且发送json数据，因而需要在header添加token和json头
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Auth-Token', store.read('token'));
        //发送请求
        put(host + uri, headers, params, callback);
    }

    static get (uri, version, callback) {
        //设置header
        let headers = new Headers();
        //get操作可能需要发送版本号，因而正确的版本号将会被添加进header
        if (version.length == 40) {
            headers.append('Version', version);
        }
        //发送请求
        get(host + uri, headers, callback);
    }
}

export default Fetch;
