'use strict';

import data from '../common/data.js';
import Api from '../lib/api.js';

import Fetch from '../common/fetch.js';
import Store from '../common/store.js';
import Common from '../common/common.js';

/*
 * 注册配置文件
 */


/*
 * 注册公共函数
 */
const empty = Common.empty;

/*
 * 注册通信函数
 */
const get = Fetch.getData;
const post = Fetch.postData;

/*
 * 注册本地缓存函数
 */
 const read = Store.readJson;
 const store = Store.storeJson;

class Model {
    static sendComment (input, callback) {
        //获取所需的变量
        const [postId, nickname, email, website, content] = [
            input.postId,
            input.nickname,
            input.email,
            input.website,
            input.content,
        ];
        //获取接口信息
        const api = new Api({ postId: postId });
        //如果nickname为空，返回不能为空
        if (empty(nickname)) {
            callback({ success: false, msg: '请输入用户名OoO' });
            return false;
        }
        //如果email为空，返回不能为空
        if (empty(email)) {
            callback({ success: false, msg: '请输入邮箱OoO' });
            return false;
        }
        //如果content为空，返回不能为空
        if (empty(content)) {
            callback({ success: false, msg: '说点什么吧OoO' });
            return false;
        }
        //组装数据
        let formData = new FormData();
        formData.append('articleId', postId);
        formData.append('nickname', nickname);
        formData.append('email', email);
        formData.append('website', website);
        formData.append('content', content);
        //发送数据
        post(api.postComment, formData, callback);
    }

    static fetchPost (input, callback) {
        const [postId] = [input.postId];
        //获取接口信息
        const api = new Api({ postId: postId });
        get(api.getPost, '', (response) => {
            const res = response.data;
            const postId = res.id;
            store('id-' + postId, res);
            callback({ post:res });
        });
    }

    static fetchPosts (input, callback) {
        const [categoryId] = [input.categoryId];
        //获取接口信息
        const api = new Api({ categoryId: categoryId });
        get(api.getCategoryPosts, '', (response) => {
            const res = response.data;
            store('category-' + categoryId, res);
            callback({ post:res });
        });
    }

    static fetchStoredPost (input, callback) {
        const [postId] = [input.postId];
        const res = read('id-' + postId);
        callback({ post:res });
    }
}

export default Model;