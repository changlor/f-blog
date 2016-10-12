'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
import Api from '../common/api.js';
//Category模型类
class Category {
    //param [array] input --包括一个参数
    //param [string] category --分类名
    //return [array] res --该分类下所包含的数据
    static getStoredCategory (input, callback) {
        //获取所需的变量
        const [category] = [input.category];
        //调用基类本地缓存读取函数
        const res = Parent.read(category);
        //回调结果
        callback(res);
    }
}

export default Category;