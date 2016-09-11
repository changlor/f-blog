<template>
    <div id="container">
    <article class="p">
        <h2 class="p-title many">{{ article.title }}</h2>
        <ul class="p-meta">
            <li><time>{{ article.created_at }}</time></li>
        </ul>
        <div v-if="article.cover != ''" class="cover"><img v-bind:src="article.cover"></div>
        <div class="p-text" v-html="text | marked"></div>
    </article>
    <div class="c-wrap clearfix">
        <div class="c-form clearfix">
            <div class="user-info clearfix">
                <input class="input-group" name="username" placeholder="小明" />
                <input class="input-group" name="email" placeholder="@xx.com" />
                <input class="input-group" name="website" placeholder="http://" />
            </div>
            <textarea class="c-content" name="content" placeholder="下面我简短的发表一下意见"></textarea>
        </div>
        <ul class="c-lists">
            <li class="c-li">
                <div class="c-post">
                    <a class="user" href="javascript:;" target="_blank">
                        <img class="avatar" src="http://gravatar.duoshuo.com/avatar/77f12b0fea29d76a2ccbc5ecb7ed51ae">
                        changle
                    </a>
                    <span class="agent">andorid</span>
                    <p class="msg">沙发发发发发发发发发发发发发发发发发发！</p>  
                    <div class="ctrl">
                        <span>5月26日</span>
                        <span class="fo" data-name="c">回应</span>
                    </div>
                </div>
            </li>
            <li class="c-li">
                <div class="c-post">
                    <a class="user" href="javascript:;" target="_blank">
                        <img class="avatar" src="http://gravatar.duoshuo.com/avatar/77f12b0fea29d76a2ccbc5ecb7ed51ae">
                        changle
                    </a>
                    <span class="agent">来自土逼的安卓</span>
                    <p class="msg">发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发发</p>
                    <div class="ctrl">
                        <span>5月26日</span>
                        <span class="fo" data-name="c">回应</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import marked from 'marked';
import blogDataApi from '../vuex/getters.js';
import blogCtrlApi from '../vuex/actions.js';
import blogFetchApi from '../common/fetch.js'
export default {
    data () {
        return {
            articleId: 0,
            articleIndex: 0,
            article: '',
            text: '',
            isCached: false,
        };
    },
    methods: {
        fetchArticle: blogFetchApi.fetchData,
    },
    vuex: {
        getters: {
            fetchCachedArticleStatus: blogDataApi.fetchCachedArticleStatus,
            fetchCachedArticleInfo: blogDataApi.fetchCachedArticleInfo,
            topicKey: blogDataApi.getCurrentTopicKey,
        },
        actions: {
            cachedInfo: blogCtrlApi.updateArticleCachedInfo,
            cachedStatus: blogCtrlApi.updateArticleCachedStatus,
        },
    },
    ready () {
        const fetchArticleCallback = (response) => {
            this.article = response.data;
            this.articleIndex = this.fetchCachedArticleInfo.length;
            this.article.text = this.article.profile + this.article.body;
            this.text = this.article.text;
            this.cachedInfo(this.article);
            this.cachedStatus(this.articleId, this.articleIndex);
        };
        const fetchCachedArticle = () => {
            this.articleIndex = this.fetchCachedArticleStatus[`id${this.articleId}`];
            this.article = this.fetchCachedArticleInfo[this.articleIndex];
            this.text = this.article.profile + this.article.body;
        };
        this.articleId = this.$route.params.tid;
        this.isCached = this.fetchCachedArticleStatus.hasOwnProperty(`id${this.articleId}`);
        this.isCached
        ? fetchCachedArticle()
        : this.fetchArticle(`http://api.blog.rain/articles/${this.articleId}`, fetchArticleCallback);
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
.c-lists {
    float: left;
    clear: left;
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