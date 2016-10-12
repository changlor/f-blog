<template>
<div id="container">
    <article class="p-wrap" v-for="post in posts">
        <a v-link="{ name: 'topic', params: { tid: post.id } }">
            <h2 class="p-title">{{ post.title }}</h2>
            <ul class="p-meta">
                <li><time>{{ post.created_at }}</time></li>
            </ul>
            <div class="p-cover"><img v-bind:src="post.cover" class=""></div>
        </a>
        <div class="p-text" v-html="post.profile | marked"></div>
    </article>
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
            posts: [],
            isCached: false, isLocalStored: false,
        };
    },
    methods: {
        readPosts () {
            this.posts = this.cachedPosts.home;
        },
        fetchPosts () {
            const callback = (res) => {
                this.cachePosts('home', res.posts);
                this.readPosts();
            };
            this.eventDelegation({
                model: 'article',
                method: 'fetchPosts',
                params: { category: 'home' },
                callback: callback,
            });
        },
        fetchStoredPosts () {
            const callback = (res) => {
                this.cachePosts('home', res.category);
                this.readPosts();
            };
            this.eventDelegation({
                model: 'category',
                method: 'fetchStoredCategory',
                params: { category: 'home' },
                callback: callback,
            });
        }
    },
    vuex: {
        getters: {
            cachedPosts: getters.fetchCachedCategories,
        },
        actions: {
            cachePosts: actions.cacheCategory,
            createMsgbox: actions.createMsgbox,
            eventDelegation: actions.eventDelegation,
        }
    },
    ready () {
        const setting = new data({
            category: 'home',
            storeKey: 'home',
        });
        const constants = setting.constants;
        const status = setting.status;

        this.categoryId = constants.categories.daily.id;
        this.isCached = this.cachedPosts.hasOwnProperty(['home']);
        this.isStored = status.isStored;

        //首先--读取缓存资源
        this.isCached ? this.readPosts() : false;
        //其次--读取本地资源
        !this.isCached && this.isStored ? this.fetchStoredPosts() : false;
        //最后--读取在线资源
        this.fetchPosts();

        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
        });
    },
    filters: {
        marked: marked
    },
}
</script>
<style>
    .cover {
        overflow: hidden;
        position: relative;
        border-radius: 10px;
    }
    img {
        margin: -60px 0;
    }
</style>