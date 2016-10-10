import storeApi from '../lib/store.js';
//注册接口函数
const readJson = storeApi.readJson;
const storeJson = storeApi.storeJson;
const readData = storeApi.readData;
const storeData = storeApi.storeData;

class store {
    static read (key) {
        return readData(key);
    }

    static store (key, value) {
        storeData(key, value);
    }

    static readPost (postId) {
        return readJson('id-' + postId);
    }

    static storePost (postId, article) {
        storeJson('id-' + postId, article);
    }

    static readJson (key) {
        return readJson(key);
    }

    static storeJson (key, value) {
        storeJson(key, value);
    }

    static isExist (key) {
        return readData(key) != null;
    }
}

export default store;