'use strict';
//读取依赖
import fetch from '../lib/fetch.js';
import data from './data.js';
import store from './store.js';
//初始化变量
const setting = new data({});
//配置基础变量
const host = setting.params.host;
const token = setting.params.token;

class blogFetchApi {
    static getData (uri, version, callback) {
        let headers = new Headers();
        headers.append('Version', version);
        fetch.get(host + uri, headers, callback);
    }

    static postData (uri, params, callback) {
        let headers = new Headers();
        headers.append('Auth-Token', token);
        fetch.post(host + uri, headers, params, callback)
    }

    static putData (uri, params, callback) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Auth-Token', store.fetchToken());
        fetch.put(host + uri, headers, params, callback)
    }
}


export default blogFetchApi;
