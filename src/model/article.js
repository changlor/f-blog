'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
//引入配置文件
import Api from '../common/api.js';
import Data from '../common/data.js';
//Article模型类
class Article {
    //param [array] input --包括三个参数
    //param [int]              categoryId  --新建文章的分类id
    //param [string]           title       --新建文章的标题
    //param (required)[string] content     --新建文章的正文
    //return [int] res --返回新建文章的id
    static createPost (input, callback) {
        //获取所需的变量
        const [categoryId, title, content] = [
            input.category,
            input.title,
            input.content,
        ];
        //获取接口信息
        const api = new Api({});
        //如果content为空，返回不能为空
        if (Parent.empty(content)) {
            callback({ success: false, msg: '请输入文章OoO' });
            return false;
        }
        //组装数据
        let post = new FormData();
        post.append('categoryId', categoryId);
        post.append('title', title);
        post.append('content', content);
        //发送数据
        Parent.post(api.createPost, post, (res) => {
            //回调结果
            callback(res);
        });
    }

    static updatePost (input, callback) {
        //获取所需变量
        const [categoryId, postId, title, profile, body] = [
            input.categoryId,
            input.postId,
            input.title,
            input.profile,
            input.body,
        ];
        //获取接口信息
        const api = new Api({ postId: postId });
        //如果profile为空，返回不能为空
        if (Parent.empty(profile)) {
            callback({ success: false, msg: '简介不能为空OoO' });
            return false;
        }
        //如果body为空，返回不能为空
        if (Parent.empty(body)) {
            callback({ success: false, msg: '正文不能为空OoO' });
            return false;
        }
        //组装数据
        const post = JSON.stringify({
            categoryId: categoryId,
            postId: postId,
            title: title,
            profile: profile,
            body: body,
        });
        //发送数据
        Parent.put(api.updatePost, post, (res) => {
            callback(res);
        });
    }

    static getPost (input, callback) {
        //获取所需数据
        if (Parent.empty(input.config)) {
            input.config =  { store: false, version: false };
        }
        const [postId, config] = [
            input.postId,
            input.config,
        ];
        //获取配置信息
        const setting = new Data({ postId: postId });
        //如果需要携带版本号，获取之
        const version = config.version ? setting.version.post : '';
        //获取接口信息
        const api = new Api({ postId: postId });
        Parent.get(api.getPost, version, (res) => {
            if (res.success) {
                //在获取成功的前提下，如果需要本地缓存保存，保存之
                res.isNewest = !Parent.empty(res.data.version);
                config.store = Parent.empty(res.data.version) && config.store;
                config.store ? Parent.store('id-' + res.data.id, res.data) : false;
            }
            callback(res);
        });
    }

    static getCategoryPosts (input, callback) {
        //获取所需数据
        if (Parent.empty(input.config)) {
            input.config =  { store: false, version: false };
        }
        const [categoryId, category, config] = [
            input.categoryId,
            input.category,
            input.config,
        ];
        //获取配置信息
        const setting = new Data({ category: category });
        //如果需要携带版本号，获取之
        const version = config.version ? setting.version.category : '';
        //获取接口信息
        const api = new Api({ categoryId: categoryId });
        Parent.get(api.getCategoryPosts, version, (res) => {
            if (res.success) {
                //在获取成功的前提下，如果需要本地缓存保存，保存之
                res.isNewest = !Parent.empty(res.data.version);
                config.store = Parent.empty(res.data.version) && config.store;
                config.store ? Parent.store(category, res.data) : false;
            }
            callback(res);
        });
    }

    static getPosts (input, callback) {
        if (Parent.empty(input.config)) {
            input.config =  { store: false, version: false };
        }
        //获取所需数据
        const [category, config] = [
            input.category,
            input.config,
        ];
        //获取配置信息
        const setting = new Data({ category: category });
        //如果需要携带版本号，获取之
        const version = config.version ? setting.version.category : '';
        //获取接口信息
        const api = new Api({});
        Parent.get(api.getPosts, version, (res) => {
            if (res.success) {
                //在获取成功的前提下，如果需要本地缓存保存，保存之
                res.isNewest = !Parent.empty(res.data.version);
                config.store = Parent.empty(res.data.version) && config.store;
                config.store ? Parent.store(category, res.data) : false;
            }
            callback(res);
        });
    }

    static getStoredPost (input, callback) {
        //获取所需数据
        const [postId] = [
            input.postId
        ];
        const res = Parent.read('id-' + postId);
        callback(res);
    }
}

export default Article;