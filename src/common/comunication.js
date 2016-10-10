'use strict';

import localStorageApi from './store.js';
import blogFetchApi from '../common/fetch.js';
import fetch from '../common/fetch.js';
import callback from '../common/callback.js';

//注册回调函数
const storePost = callback.storePost;

class Config {
    static fetchPost (postId) {
        fetch.getData(`post/${postId}`, 11, (response) => {
            console.log(response);
            storePost(postId, response.data);
            return {
                article: response.data,
                body: response.data.body,
            }
        });
    }
}

export default Config;