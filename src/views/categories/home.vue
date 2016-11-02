<template>
<div class="container">
    <div class="row">
        <div id="index" role="main">
            <article v-for="post in posts" itemscope="" itemtype="http://onesan.love">
                <div class="post" id="index-post">
                    <a v-link="{ name: 'topic', params: { tid: post.id } }"><h2 class="post-title" itemprop="headline">{{ post.title }}</h2></a>
                    <div class="post-info">
                        <span itemprop="datePublished">{{ post.created_at }} • </span>
                        <span itemprop="categoryPublished"><a href="https://hran.me/category/nichijou/">日常</a> • </span>
                        <span class="comments"><a href="https://hran.me/archives/repair-iphone-at-apple-store.html#comments"><span class="ds-thread-count" data-thread-key="628" data-count-type="comments">20条评论</span></a></span>
                    </div>
                    <p class="cover" v-if="post.cover != ''" v-link="{ name: 'topic', params: { tid: post.id } }"><img v-bind:src="post.cover"></p>
                    <div class="post-content" itemprop="description">
                        <p></p>
                        <div v-html="post.profile | marked"></div>
                        <p class="more">
                            <a v-link="{ name: 'topic', params: { tid: post.id } }" title="{{ post.title }}">阅读全文</a>
                        </p>
                        <p></p>
                    </div>
                </div>
            </article>
        </div>
    </div>
</div>
</template>
<script>
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
        getPosts () {
            const callback = (res) => {
                if (res.success && !res.isNewest) {
                    this.cachePosts('home', res.data);
                    this.readPosts();
                }
            };
            this.eventDelegation({
                model: 'Article',
                method: 'getPosts',
                params: {
                    categoryName: 'home',
                    config: {
                        store: true,
                        version: true,
                    }
                },
                callback: callback,
            });
        },
        getStoredPosts () {
            const callback = (res) => {
                this.cachePosts('home', res);
                this.readPosts();
            };
            this.eventDelegation({
                model: 'Category',
                method: 'getStoredCategory',
                params: { categoryName: 'home' },
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

    },
    filters: {
        marked: marked
    },
}
</script>