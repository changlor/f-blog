//基础父模块
import Base from './Base';
const Parent = new Base();
//加载依赖模块
import Api from '../common/Api';
import Data from '../common/Data';

/*
 * @description: Editor模型类，提供对编辑器操作方法的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Editor {
    /*
     * @return [array] res --返回本地草稿
     */
    static getDraft (input, callback) {
        //获取数据
        const res = Parent.read('draft');
        //回调数据
        callback(res);
    }

    /*
     * @param [array] input --包括两个个参数
     * @param [string] title   --草稿文章的标题
     * @param [string] content --草稿文章的正文
     * @return [boolean] res --保存与否的状态
     */
    static storeDraft (input, callback) {
        //获取所需的变量
        const draft = {};
        [draft.title, draft.content] = [
            input.title,
            input.content
        ];
        //保存数据
        Parent.store('draft', draft);
        //回调数据
        callback();
    }
}

export default Editor;