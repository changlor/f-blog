<template>
    <div id="container">
    <article class="p">
        <h2 class="p-title many">{{ article.title }}</h2>
        <ul class="p-meta">
            <li><time>{{ article.created_at }}</time></li>
        </ul>
        <div v-if="article.cover != ''" class="cover"><img v-bind:src="article.cover"></div>
        <div class="p-text" v-html="body | marked"></div>
    </article>
    <div class="c-wrap clearfix">
        <div class="c-form clearfix">
            <div class="user-info clearfix">
                <input class="input-group" v-model="nickname" placeholder="小明" />
                <input class="input-group" v-model="email" placeholder="@xx.com" />
                <input class="input-group" v-model="website" placeholder="http://" />
            </div>
            <textarea class="c-content" v-model="content" placeholder="下面我简短的发表一下意见"></textarea>
            <a class="form-submit" v-on:click="submitComment">要射了噢</a>
        </div>
        <ul class="c-lists">
            <li v-for="comment in comments" class="c-li">
                <div class="c-post">
                    <a class="user" href="{{ comment.website }}" target="_blank">
                        <img class="avatar" src="http://gravatar.duoshuo.com/avatar/77f12b0fea29d76a2ccbc5ecb7ed51ae">
                        {{ comment.nickname }}
                    </a>
                    <span class="agent">andorid</span>
                    <p class="msg">{{ comment.content }}</p>  
                    <div class="ctrl">
                        <span>{{ comment.created_at }}</span>
                        <span class="fo" data-name="c">回应</span>
                    </div>
                </div>
            </li>
            <li v-if="!hasCommets"><blockquote><p>沙发还留着qwq</p></blockquote></li>
        </ul>
    </div>
</div>
</template>
<script>
import marked from 'marked';
import blogDataApi from '../vuex/getters.js';
import blogCtrlApi from '../vuex/actions.js';
import blogFetchApi from '../common/fetch.js';
import blogCommonApi from '../common/common.js';
import localStorageApi from '../common/store.js';

export default {
    data () {
        return {
            //文章主体部分
            articleId: 0,
            articleIndex: 0,
            article: false,
            body: '',
            //评论
            comments: '',
            //状态
            isCached: false,
            isLocalStored: false,
            hasCommets: false,
            version: false,
            //回复
            nickname: '',
            email: '',
            website: '',
            content:'',
        };
    },
    methods: {
        //获取模块api函数
        fetchArticle: blogFetchApi.fetchData,
        localStoredArticle: localStorageApi.savedArticle,
        fetchLocalStoredArticle: localStorageApi.fetchArticle,
        getLocalStoredArticleVersion: localStorageApi.cachedArticleVersion,
        
        fetchComments: blogFetchApi.fetchData,
        sendComment: blogFetchApi.sendData,

        getCurrentDate: blogCommonApi.getCurrentDate,
        //组件函数
        submitComment () {
            if (this.nickname == '') {
                this.createNewMsgBox(true, '请输入用户名OwO');
                return false;
            }
            if (this.email == '') {
                this.createNewMsgBox(true, '请输入邮箱OwO');
                return false;
            }
            if (this.content == '') {
                this.createNewMsgBox(true, '说点什么吧OwO');
                return false;
            }
            let formData = new FormData();
            formData.append('nickname', this.nickname);
            formData.append('email', this.email);
            formData.append('website', this.website);
            formData.append('articleId', this.articleId);
            formData.append('content', this.content);
            this.comments.push({
                nickname: this.nickname,
                email: this.email,
                content: this.content,
                website: this.website,
                created_at: this.getCurrentDate(),
            });
            this.hasCommets = true;
            const sendCommentCallback = (response) => {
                if (response.success) {
                    this.content = '';
                    this.createNewMsgBox(true, '发射成功啦~QwQ');
                } else {
                    this.comments.pop();
                    this.comments.length > 0 ? this.hasCommets = true : this.hasCommets = false;
                    this.createNewMsgBox(true, '发射失败QwQ');
                }
            }
            this.sendComment('comments', formData, sendCommentCallback);
        },
    },
    vuex: {
        getters: {
            fetchCachedArticleStatus: blogDataApi.fetchCachedArticleStatus,
            fetchCachedArticleInfo: blogDataApi.fetchCachedArticleInfo,
        },
        actions: {
            cachedInfo: blogCtrlApi.updateArticleCachedInfo,
            cachedStatus: blogCtrlApi.updateArticleCachedStatus,
            createNewMsgBox: blogCtrlApi.createNewMsgBox,
        },
    },
    ready () {
        //获取必要的信息，文章id，是否缓存，是否本地保存
        this.articleId = this.$route.params.tid;
        this.isCached = this.fetchCachedArticleStatus.hasOwnProperty(`id${this.articleId}`);
        this.isLocalStored = this.fetchLocalStoredArticle(this.articleId) !== null;
        //如果本地保存了，获取当前本地缓存的版本
        if (this.isLocalStored) { 
            this.version = this.getLocalStoredArticleVersion(this.articleId);
        }

        //缓存文章方法
        const cachedArticle = (article) => {
            this.article = article;
            this.articleIndex = this.fetchCachedArticleInfo.length;
            this.body = this.article.body;
            this.isCached = true;
            this.cachedInfo(this.article);
            this.cachedStatus(this.articleId, this.articleIndex);
        }

        //保存文章方法
        const storedArticle = (article) => {
            this.localStoredArticle(this.articleId, this.article);
        }

        //获取文章(变动小，使用缓存)
        const fetchArticleCallback = (response) => {
            cachedArticle(response.data);
            storedArticle(response.data);
        };
        const fetchCachedArticle = () => {
            this.articleIndex = this.fetchCachedArticleStatus[`id${this.articleId}`];
            this.article = this.fetchCachedArticleInfo[this.articleIndex];
            this.body = this.article.body;
        };

        //获取本地缓存，如果已经缓存在浏览器，则不重复缓存
        if (this.isLocalStored && !this.isCached) {
            cachedArticle(this.fetchLocalStoredArticle(this.articleId));
        }
        
        this.isCached
        ? fetchCachedArticle()
        : this.fetchArticle(`articles/${this.articleId}`, fetchArticleCallback);

        //获取评论(变动大，不使用缓存)
        const fetchCommentsCallback = (response) => {
            this.comments = response.data;
            this.comments.length > 0 ? this.hasCommets = true : this.hasCommets = false;
        }
        this.fetchComments(`comments?article_id=${this.articleId}`, fetchCommentsCallback);

        //最后，当本地存在文章缓存的时候，为避免无法更新数据，需要确认一次版本号
        const fetchNewVersionArticleCallback = (response) => {
            if (response.data.version != this.version) {
                cachedArticle(response.data);
                storedArticle(response.data);
            }
        };
        if (this.isLocalStored) {
            this.fetchArticle(`articles/${this.articleId}?version=${this.version}`, fetchNewVersionArticleCallback);
        }
        
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false
        });
    },
    filters: {
        marked: marked
    },
}
</script>
<style>
.c-wrap {
    margin-top: 60px;
}
.input-group {
    margin-top: 20px;
    float: left;
    clear: left;
    background-color: #f9f9f9;
    bottom: 50px;
    font-size: 16px;
    outline: none;
    border: 0;
    border-radius: 3px;
    padding: 10px 15px;
    width: 300px;
}
.form-submit {
    position: absolute;
    right: 130px;
    line-height: 0;
    color: rgba(238, 110, 115, 1);
    cursor: pointer;
}
.c-lists {
    float: left;
    clear: left;
    margin-bottom: 120px;
}
.user-info {
    float: left;
}
.c-content {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f9f9f9;
    font-size: 16px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
    height: 114px;
    width: 350px;
    margin: 20px;
}
li {
    list-style: none;
}
.c-li {
    margin: 35px;
    margin-left: 10px;
}
.c-post {
    padding: 5px;
    margin: 5px;
}

.user img {
    width: 55px;
    border: 10px solid #f6f6f6;
    border-radius: 40px;
    position: absolute;
    left: 400px;
}

.user {
    padding-left: 40px;
    line-height: 50px;
    text-decoration: none;
}
.msg {
    margin-top: 0px;
    padding-left: 42px;
}
.ctrl {
    margin-left: -30px;
}
</style>