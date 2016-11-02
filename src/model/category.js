//加载父模块
import Base from './Base';
const Parent = new Base();
//加载依赖模块

/*
 * @description: Category模型类，提供对分类的curd操作的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Category {
    /*
     * @description: 获取分类缓存
     * param [array] input --包括一个参数
     * param [string] category --分类名
     * return [array] res --该分类下所包含的数据
     */
    static getStoredCategory (input, callback) {
        //获取所需的变量
        const [category] = [input.category];
        //调用父类本地缓存读取函数
        const res = Parent.readJson(category);
        //回调结果
        callback(res);
    }
}

export default Category;