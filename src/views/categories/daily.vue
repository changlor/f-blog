<template>
<div class="container">
    <div class="row">
        <div id="index" role="main">
            <article v-for="post in posts" itemscope="" itemtype="http://onesan.love">
                <div class="post" id="index-post">
                    <a v-link="{ name: 'topic', params: { tid: post.id } }"><h2 class="post-title" itemprop="headline">{{ post.title }}</h2></a>
                    <div class="post-info">
                        <span itemprop="datePublished">09 月 04 日 2016 年 • </span>
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
import Data from '../../common/Data';
import marked from 'marked';
import hljs from '../../lib/highlight/highlight';
import actions from '../../vuex/actions';
import getters from '../../vuex/getters';

export default {
    data () {
        return {
            posts: [],
            isStored: false,
            categoryId: false,
        };
    },
    methods: {
        readPosts () {
            this.posts = this.cachedPosts.daily;
        },
        getPosts () {
            const callback = (res) => {
                if (res.success && !res.isNewest) {
                    this.cachePosts('daily', res.data);
                    this.readPosts();
                }
            };
            this.eventDelegation({
                model: 'Article',
                method: 'getCategoryPosts',
                params: {
                    categoryId: this.categoryId,
                    categoryName: 'daily',
                    config: {
                        version: true,
                        store: true,
                    },
                },
                callback: callback,
            });
        },
        getStoredPosts () {
            const callback = (res) => {
                this.cachePosts('daily', res);
                this.readPosts();
            };
            this.eventDelegation({
                model: 'Category',
                method: 'getStoredCategory',
                params: { category: 'daily' },
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
        const setting = new Data({
            categoryName: 'daily',
            storeKey: 'daily',
        });

        this.categoryId = setting.constants.categories.daily.id;
        this.isCached = this.cachedPosts.hasOwnProperty(['daily']);
        this.isStored = setting.variables.isStored;
        
        //首先--读取缓存资源
        this.isCached ? this.readPosts() : false;
        //其次--读取本地资源
        !this.isCached && this.isStored ? this.getStoredPosts() : false;
        //最后--读取在线资源
        this.getPosts();

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
</style>