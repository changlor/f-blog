import Fetch from './communication/Fetch';
import Store from './communication/Store';
import empty from 'locutus/php/var/empty';
import trim from 'locutus/php/strings/trim';
import ucfirst from 'locutus/php/strings/ucfirst';
import time from 'locutus/php/datetime/time';
import explode from 'locutus/php/strings/explode';

const read = function (key) {
    return Store.read(key);
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
    time: time,
    trim: trim,
    empty: empty,
    ucfirst: ucfirst,
    explode: explode,
    read: read,
    store: store,
    get: get,
    post: post,
    put: put,
};