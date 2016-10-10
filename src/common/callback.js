'use strict';

import localStorageApi from './store.js';

class Config {
    static storePost (postId, post) {
        localStorageApi.savedArticle(postId, post);
    }
}

export default Config;