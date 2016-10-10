'use strict';

import base from './base.js';
import Api from '../common/api.js';

const Parent = new base();

class Article {
    static fetchPost (input, callback) {
        const [postId] = [input.postId];
        //获取接口信息
        const api = new Api({ postId: postId });
        Parent.get(api.getPost, '', (response) => {
            const res = response.data;
            const postId = res.id;
            Parent.store('id-' + postId, res);
            callback({ post:res });
        });
    }

    static fetchCategoryPosts (input, callback) {
        const [categoryId, category] = [input.categoryId, input.category];
        //获取接口信息
        const api = new Api({ categoryId: categoryId });
        Parent.get(api.getCategoryPosts, '', (response) => {
            const res = response.data;
            Parent.store(category, res);
            callback({ posts:res });
        });
    }

    static fetchPosts (input, callback) {
        const [category] = [input.category];
        //获取接口信息
        const api = new Api({});
        Parent.get(api.getPosts, '', (response) => {
            const res = response.data;
            Parent.store(category, res);
            callback({ posts:res });
        });
    }

    static fetchStoredPost (input, callback) {
        const [postId] = [input.postId];
        const res = Parent.read('id-' + postId);
        callback({ post:res });
    }
}

export default Article;