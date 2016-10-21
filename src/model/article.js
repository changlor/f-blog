//加载父模块
import Base from './Base';
const Parent = new Base();
//加载依赖模块
import Api from '../common/Api';
import Data from '../common/Data';

/*
 * @description: Articel模型类，提供对文章的curd操作的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Article {
    /*
     * @description: 新建文章方法
     * @param [array] input --包括三个参数
     * @param [int]              categoryId  --新建文章的分类id
     * @param [string]           title       --新建文章的标题
     * @param (required)[string] content     --新建文章的正文
     * @return [int] --创建成果返回新建文章的id
     */
    static createPost (input, callback) {
        //获取所需的变量
        const [categoryId, title, content] = [
            input.categoryId,
            input.title,
            input.content,
        ];
        //如果content为空，返回不能为空
        if (Parent.empty(content)) {
            callback(Parent.response([false, '请输入文章OoO']));
            return false;
        }
        //组装数据
        const post = {
            categoryId: categoryId,
            title: title,
            content: content,
        };
        //获取接口信息
        const api = new Api({});
        const uri = api.createPost;
        //调用父模块post方法发送post数据
        Parent.post(uri, post, (res) => {
            //回调结果
            callback(res);
        });
    }

    /*
     * @description: 更新文章方法
     * @param [array] input --包括四个参数
     * @param [int]              categoryId  --修改文章的分类id
     * @param [int]              postId  --修改文章的id
     * @param [string]           title       --修改文章的标题
     * @param (required)[string] profile     --修改文章的简介
     * @param (required)[string] body        --修改文章的正文
     * @return [boolean] --返回更新成功与否的状态
     */
    static updatePost (input, callback) {
        //获取所需变量
        const [categoryId, postId, title, profile, body] = [
            input.categoryId,
            input.postId,
            input.title,
            input.profile,
            input.body,
        ];
        //如果profile为空，返回不能为空
        if (Parent.empty(profile)) {
            callback(Parent.response(false, '简介不能为空OoO'));
            return false;
        }
        //如果body为空，返回不能为空
        if (Parent.empty(body)) {
            callback(Parent.response(false, '正文不能为空OoO'));
            return false;
        }
        //组装数据
        const post = {
            categoryId: categoryId,
            postId: postId,
            title: title,
            profile: profile,
            body: body,
        };
        //获取接口信息
        const api = new Api({ postId: postId });
        const uri = api.updatePost;
        //调用父模块put方法发送put数据
        Parent.put(uri, post, (res) => {
            //回调结果
            callback(res);
        });
    }

    /*
     * @description: 获取文章
     * @param [array] input --包括两个参数
     * @param [int]    postId  --需要获取文章的id
     * @param [object] config  --回调配置，是否本地保存或者携带版本号请求头
     * @return [array] --返回选取的文章
     */
    static getPost (input, callback) {
        //获取文章配置项，是否缓存和是否携带版本号，如果没有配置，默认都为false
        if (Parent.empty(input.config)) {
            input.config =  { store: false, version: false };
        }
        //获取所需数据
        const [postId, config] = [
            input.postId,
            input.config,
        ];
        //获取配置信息
        const setting = new Data({ postId: postId });
        //如果需要携带版本号，获取之
        const version = config.version ? setting.variables.postVersion : '';
        //获取接口信息
        const api = new Api({ postId: postId });
        const uri = api.getPost;
        //调用父模块get方法获取get数据
        Parent.get(uri, version, (res) => {
            if (res.success) {
                //如果获取到的结果具体版本号而且非空，则说明当前环境下的文章数据是最新的
                res.isNewest = !Parent.empty(res.data.version);
                //如果文章数据不是最新版本并且配置为true，则本地缓存
                config.store = !res.isNewest && config.store;
                //如果需要本地缓存保存，保存之
                config.store ? Parent.store('id-' + res.data.id, res.data) : false;
            }
            //回调结果
            callback(res);
        });
    }

    /*
     * @description: 获取分类文章
     * param [array] input --包括三个参数
     * param [int]    categoryId --需要获取分类下文章的分类id
     * param [string] category   --需要获取分类下文章的分类名
     * param [object] config     --回调配置，是否本地保存或者携带版本号请求头
     * return [array] --返回选取分类的文章
     */
    static getCategoryPosts (input, callback) {
        //获取文章配置项，是否缓存和是否携带版本号，如果没有配置，默认都为false
        if (Parent.empty(input.config)) {
            input.config =  { store: false, version: false };
        }
        //获取所需数据
        const [categoryId, categoryName, config] = [
            input.categoryId,
            input.categoryName,
            input.config,
        ];
        //获取配置信息
        const setting = new Data({ categoryName: categoryName });
        //如果需要携带版本号，获取之
        const version = config.version ? setting.variables.categoryVersion : '';
        //获取接口信息
        const api = new Api({ categoryId: categoryId });
        const uri = api.getCategoryPosts;
        //调用父模块get方法获取get数据
        Parent.get(uri, version, (res) => {
            if (res.success) {
                //如果获取到的结果具体版本号而且非空，则说明当前环境下的文章数据是最新的
                res.isNewest = !Parent.empty(res.data.version);
                //如果文章数据不是最新版本并且配置为true，则本地缓存
                config.store = !res.isNewest && config.store;
                //如果需要本地缓存保存，保存之
                config.store ? Parent.store(categoryName, res.data) : false;
            }
            //回调数据
            callback(res);
        });
    }

    /*
     * @description: 获取首页所有文章
     * param [array] input --包括两个参数
     * param [string] category --需要获取分类下文章的分类名
     * param [object] config   --回调配置，是否本地保存或者携带版本号请求头
     * return [array] --返回选取分类的文章
     */
    static getPosts (input, callback) {
        //获取文章配置项，是否缓存和是否携带版本号，如果没有配置，默认都为false
        if (Parent.empty(input.config)) {
            input.config =  { store: false, version: false };
        }
        //获取所需数据
        const [categoryName, config] = [
            input.categoryName,
            input.config,
        ];
        //获取配置信息
        const setting = new Data({ categoryName: categoryName });
        //如果需要携带版本号，获取之
        const version = config.version ? setting.variables.categoryVersion : '';
        //获取接口信息
        const api = new Api({});
        const uri = api.getPosts;
        //调用父模块get方法获取get数据
        Parent.get(uri, version, (res) => {
            if (res.success) {
                //如果获取到的结果具体版本号而且非空，则说明当前环境下的文章数据是最新的
                res.isNewest = !Parent.empty(res.data.version);
                //如果文章数据不是最新版本并且配置为true，则本地缓存
                config.store = !res.isNewest && config.store;
                //如果需要本地缓存保存，保存之
                config.store ? Parent.storeJson(categoryName, res.data) : false;
            }
            //回调结果
            callback(res);
        });
    }

    /*
     * @description: 获取本地缓存文章
     * param [array] input  --包括一个参数
     * param [int]   postId --需要获取文章的分类id
     * return [array] --返回选取的文章
     */
    static getStoredPost (input, callback) {
        //获取所需数据
        const [postId] = [
            input.postId
        ];
        //调用父类本地缓存读取函数
        const res = Parent.readJson('id-' + postId);
        //回调结果
        callback(res);
    }
}

export default Article;