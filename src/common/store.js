//加载父模块
import Parent from '../lib/Store';

/*
 * @description: Store接口类，提供对localstorage的操作接口
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Store {
    //直接读取localstorage数据
    static read (key) {
        return Parent.read(key);
    }
    //直接保存数据到localstorage
    static store (key, value) {
        Parent.store(key, value);
    }
    //以读取json的方式读取localstorage数据
    static readJson (key) {
        try {
            return JSON.parse(Parent.read(key));
        } catch (e) {
            return null;
        }
    }
    //以json格式保存数据到localstorage
    static storeJson (key, value) {
        Parent.store(key, JSON.stringify(value));
    }
    //判断localstorage是否保存某数据
    static isExist (key) {
        return Parent.read(key) != null;
    }
}

export default Store;