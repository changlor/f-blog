<template>
    <div id="container">
    <article class="p">
        <h2 class="p-title many">{{ post.title }}</h2>
        <ul class="p-meta">
            <li><time>{{ post.created_at }}</time></li>
        </ul>
        <div v-if="post.cover != ''" class="cover"><img v-bind:src="post.cover"></div>
        <div class="p-text" v-html="postBody | marked"></div>
    </article>
    <div class="c-wrap clearfix">
        <div class="c-form clearfix">
            <div class="c-userinfo clearfix">
                <input class="c-input" v-model="nickname" placeholder="小明" />
                <input class="c-input" v-model="email" placeholder="@xx.com" />
                <input class="c-input" v-model="website" placeholder="http://" />
            </div>
            <textarea class="c-content" v-model="content" placeholder="下面我简短的发表一下意见"></textarea>
            <a class="c-submit">要射了噢</a>
        </div>
        <ul class="c-lists">
            <li v-for="comment in comments" class="c-list">
                <div class="c-post">
                    <a class="user" href="{{ comment.website }}" target="_blank">
                        <img class="avatar" v-bind:src="comment.avatar">
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
import data from '../common/data.js';
import marked from 'marked';
import hljs from '../lib/highlight/highlight.js';
import actions from '../vuex/actions.js';
import getters from '../vuex/getters.js';

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
        fetchPost () {
            const callback = (res) => {
                this.cachePost(res.post);
                this.readPost();
            };
            this.eventDelegation({
                model: 'article',
                method: 'fetchPost',
                params: { postId: this.postId },
                callback: callback,
            });
        },
        fetchStoredPost () {
            const callback = (res) => {
                this.cachePost(res.post);
                this.readPost();
            };
            this.eventDelegation({
                model: 'article',
                method: 'fetchStoredPost',
                params: { postId: this.postId },
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
            createNewMsgbox: actions.createNewMsgbox,
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

        //首先--读取本地资源
        !this.isCached && this.isStored ? this.fetchStoredPost() : false;
        //其次--读取在线资源
        this.fetchPost();
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