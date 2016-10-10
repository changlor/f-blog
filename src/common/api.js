'use strict';

import api from '../lib/config/api.js';

class Api {
    constructor(init) {
        this.params = {
            postId: init.postId,
            categoryId: init.categoryId,
        };
        this.getPost = api.getPost.replace(/:id/gi, this.params.postId);
        this.getCategoryPosts = api.getCategoryPosts.replace(/:id/gi, this.params.categoryId);
        this.getPosts = api.getPosts;
        this.getComments = api.getComments.replace(/:id/gi, this.params.postId);
        this.postComment = 'comment';
    }
}

export default Api;
