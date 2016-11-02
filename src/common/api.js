const host = 'http://api.blog.rain/';

class Api {
    constructor(init) {
        //给成员函数绑定this指向
        ::this.post; ::this.comment; ::this.auth;
        //初始化成员变量
        this.params = {
            postId: init.postId,
            pageId: init.pageId,
        };
        //auth
        this.signin = '';
        //post
        this.createPost = ''; this.updatePost = ''; this.getPost = ''; this.getPosts = '';
        //comment
        this.getComments = ''; this.createComment = '';
    }

    post () {
        this.createPost = `post`;
        this.updatePost = `post/${this.params.postId}`;
        this.getPost = `post/${this.params.postId}`;
        this.getPosts = `post/${this.params.pageId}`;
    }

    comment () {
        this.createComment = 'comment';
        this.getComments = `comments/${this.params.postId}`;
    }

    auth () {
        this.signin = 'signin';
    }
}

export default Api;
