//加载依赖模块
import { Fetch } from '../common';
console.log(Fetch)
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
    //返回格式化数据方法
    response (res) {
        if (this.empty(res)) {
            res = [];
        }
        if (this.empty(res[0]) && !res[0]) {
            res[0] = false;
        }
        if (this.empty(res[1])) {
            res[1] = res[0] ? '' : '未知错误';
        }
        if (this.empty(res[2])) {
            res[2] = [];
        }
        return {
            success: res[0], msg: res[1], data: res[2]
        };
    }
}

export default Base;