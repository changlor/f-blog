import Fetch from './communication/Fetch';
import Store from './communication/Store';

const read = function (key) {
    Store.read(key);
};
const store = function (key, value) {
    Store.store(key, value);
};
const get = function (url, headers, callback) {
    Fetch.get(url, headers, callback);
};
const post = function (url, headers, params, callback) {
    Fetch.post(url, headers, params, callback)
};
const put = function (url, headers, params, callback) {
    Fetch.put(url, headers, params, callback)
};

export default {
    read: read,
    store: store,
    get: get,
    post: post,
    put: put,
};