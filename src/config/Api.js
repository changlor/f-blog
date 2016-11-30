const host = 'http://api.blog.rain/';
//const host = 'http://v-blog.api.kotori.love/';
const page = {
    'daily': 3,
    'home': 1,
};

class Api {
    constructor(init) {
        //给成员函数绑定this指向
        ::this.post; ::this.comment; ::this.auth;
        //获得配置变量
        const postId = init.postId;
        const pageId = page[init.pageName];
        //初始化成员变量
        this.params = {
            postId: postId,
            pageId: pageId,
        };
        //auth
        this.signin = '';
        //post
        this.createPost = ''; this.updatePost = ''; this.getPost = ''; this.getPosts = '';
        //comment
        this.getComments = ''; this.createComment = '';
        //拼接url
        this.post(); this.comment(); this.auth();
    }

    post () {
        this.createPost = host + `post`;
        this.updatePost = host + `post/${this.params.postId}`;
        this.getPost = host + `post/${this.params.postId}`;
        this.getPosts = host + `posts/${this.params.pageId}`;
    }

    comment () {
        this.createComment = host + 'comment';
        this.getComments = host + `comments/${this.params.postId}`;
    }

    auth () {
        this.signin = host + 'signin';
    }
}

export default Api;
