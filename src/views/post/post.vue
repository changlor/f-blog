<template>
    <div id="container">
    <article class="p-wrap clearfix">
        <h2 class="p-title">{{ post.title }}</h2>
        <ul class="p-meta">
            <li><time>{{ post.created_at }}</time></li>
        </ul>
        <div class="p-cover" v-if="post.cover != ''"><img v-bind:src="post.cover"></div>
        <div class="p-text" v-html="postBody | marked"></div>
    </article>
    <div class="c-wrap clearfix">
        <div class="c-form clearfix">
            <div class="meta clearfix">
                <input v-model="nickname" placeholder="小明" />
                <input v-model="email" placeholder="@xx.com" />
                <input v-model="website" placeholder="http://" />
            </div>
            <textarea class="content" v-model="content" placeholder="下面我简短的发表一下意见"></textarea>
            <a class="submit">要射了噢</a>
        </div>
        <ul class="c-lists clearfix">
            <li v-for="comment in comments">
                <div class="c-list">
                    <a class="user" href="{{ comment.website }}" target="_blank">
                        <img class="avatar" src="http://gravatar.duoshuo.com/avatar/b7f6ae83917067e9d8e24233e46b59ef?s=50">
                    </a>
                    <p class="content">{{ comment.content }}</p>  
                    <div class="meta">
                        <a href="{{ comment.website }}" ><span>{{ comment.nickname }}</span></a>
                        <time>{{ comment.created_at }}</time>
                        <span class="reply">reply</span>
                    </div>
                </div>
            </li>
            <li v-if="!hasCommet"><blockquote><p>沙发还留着qwq</p></blockquote></li>
        </ul>
    </div>
</div>
</template>
<script>
import data from '../../common/data.js';
import marked from 'marked';
import hljs from '../../lib/highlight/highlight.js';
import actions from '../../vuex/actions.js';
import getters from '../../vuex/getters.js';

export default {
    data () {
        return {
            //文章主体部分
            post: {}, postId: false, postBody: '',
            //评论
            comments: [],
            //状态
            isCached: false, isStored: false, hasCommet: false,
            //回复
            nickname: '', email: '', website: '', content:'',
        };
    },
    methods: {
        readPost () {
            this.post = this.cachedPosts[`id-${this.postId}`];
            this.postBody = this.post.body;
        },
        getPost () {
            const callback = (res) => {
                if (res.success && !res.isNewest) {
                    this.cachePost(res.data);
                    this.readPost();
                }
            };
            this.eventDelegation({
                model: 'Article',
                method: 'getPost',
                params: {
                    postId: this.postId,
                    config: {
                        version: true,
                        store: true,
                    },
                },
                callback: callback,
            });
        },
        getStoredPost () {
            const callback = (res) => {
                this.cachePost(res);
                this.readPost();
            };
            this.eventDelegation({
                model: 'Article',
                method: 'getStoredPost',
                params: { postId: this.postId },
                callback: callback,
            });
        },
        getComments () {
            const callback = (res) => {
                this.comments = res.comments;
                this.hasCommet = this.comments.length != 0;
            };
            this.eventDelegation({
                model: 'Comment',
                method: 'getComments',
                params: { postId: this.postId },
                callback: callback,
            });
        },
    },
    vuex: {
        getters: {
            cachedPosts: getters.fetchCachedPosts,
        },
        actions: {
            cachePost: actions.cachePost,
            createMsgbox: actions.createMsgbox,
            eventDelegation: actions.eventDelegation,
        }
    },
    ready () {
        this.postId = this.$route.params.tid;
        const setting = new data({
            postId: this.postId,
            storeKey: `id-${this.postId}`,
        });
        const status = setting.status;

        this.isCached = this.cachedPosts.hasOwnProperty([`id-${this.postId}`]);
        this.isStored = status.isStored;

        //首先--读取缓存资源
        this.isCached ? this.readPost() : false;
        //其次--读取本地文章资源
        !this.isCached && this.isStored ? this.getStoredPost() : false;
        //最后--读取在线文章资源
        this.getPost();
        //读取评论资源
        this.getComments();
        
        marked.setOptions({
            highlight: (code) => {
                return hljs.highlightAuto(code).value
            },
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