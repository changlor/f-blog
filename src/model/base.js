//加载依赖模块
import Func from '../lib/load';
import Fetch from './lib/Fetch';
import Api from '../config/Api';

/*
 * @description: Base模型类，提供对子类的各种底层操作方法接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Base {
    //初始化各种子类需要的方法函数
    constructor() {
        //通信函数
        [this.get, this.post, this.put] = [
            Fetch.get,
            Fetch.post,
            Fetch.put,
        ];
    }
}

const Parent = new Base();

export { Parent, Func, Api };