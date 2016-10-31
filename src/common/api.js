import api from '../lib/config/api';

class Api {
    constructor(init) {
        this.params = {
            postId: init.postId,
            categoryId: init.categoryId,
        };
        this.signin = api.signin;
        this.createPost = api.createPost;
        this.updatePost = api.updatePost.replace(/:id/gi, this.params.postId);
        this.getPost = api.getPost.replace(/:id/gi, this.params.postId);
        this.getCategoryPosts = api.getCategoryPosts.replace(/:id/gi, this.params.categoryId);
        this.getPosts = api.getPosts;
        this.getComments = api.getComments.replace(/:id/gi, this.params.postId);
        this.createComment = api.createComment;
    }
}

export default Api;
