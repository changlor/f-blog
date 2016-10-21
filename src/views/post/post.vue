<template>
<div class="container">
    <div class="row">
        <div id="post" role="main">
            <article class="post" itemscope="" itemtype="http://schema.org/BlogPosting">
                <h2 class="post-title" itemprop="name headline">{{ post.title }}</h2>
                <ul class="post-meta">
                    <li><time datetime="2016-09-04T16:45:00+08:00" itemprop="datePublished">09 月 04 日 2016 年</time></li>
                    <li> • 阅读: 374</li>
                    <li> • <a href="https://hran.me/category/nichijou/">日常</a></li>
                </ul>
                <p class="cover" v-if="post.cover != ''"><img v-bind:src="post.cover"></p>
                <div class="post-content" itemprop="articleBody">
                    <p></p>
                    <div v-html="postBody | marked"></div>
                </div>
                <div class="tags">
                    <div class="dkeywords">
                        <div itemprop="keywords" class="keywords">标签: <a href="https://hran.me/tag/Apple-Store/">Apple Store</a>, <a href="https://hran.me/tag/%E5%94%AE%E5%90%8E/">售后</a></div>
                    </div>
                </div>
                <div class="post-buttons">
                    <a id="toggle-archives" href="https://hran.me/archives.html">返回文章列表</a>
                    <a id="toggle-post-qr-code">文章二维码</a>
                    <a id="toggle-reward-qr-code">打赏</a>
                </div>
            </article>
        </div>
    </div>
</div>
</template>
<script>
import Data from '../../common/Data.js';
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
                this.comments = res.data;
                this.hasCommet = this.comments.length != 0;
            };
            this.eventDelegation({
                model: 'Comment',
                method: 'getComments',
                params: { postId: this.postId },
                callback: callback,
            });
        },
        createComment () {
            const callback = (res) => {
                this.createMsgbox(res.msg);
                console.log(res);
            };
            this.eventDelegation({
                model: 'Comment',
                method: 'createComment',
                params: {
                    postId: this.postId,
                    nickname: this.nickname,
                    email: this.email,
                    website: this.website,
                    content: this.content,
                },
                callback: callback,
            });
        }
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
        const setting = new Data({
            postId: this.postId,
            storeKey: `id-${this.postId}`,
        });

        this.isCached = this.cachedPosts.hasOwnProperty([`id-${this.postId}`]);
        this.isStored = setting.variables.isStored;

        //首先--读取缓存资源
        this.isCached ? this.readPost() : false;
        //其次--读取本地文章资源
        !this.isCached && this.isStored ? this.getStoredPost() : false;
        //最后--读取在线文章资源
        this.getPost();
        //读取评论资源
        setTimeout(()=>{
            this.getComments();
        }, 0);
        
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