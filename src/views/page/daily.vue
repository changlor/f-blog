<template>
<div class="container">
    <div class="row">
        <div id="index" role="main">
            <article v-for="post in posts" itemscope="" itemtype="http://onesan.love">
                <div class="post" id="index-post">
                    <a v-link="{ name: 'post', params: { id: post.id } }"><h2 class="post-title" itemprop="headline">{{ post.title }}</h2></a>
                    <div class="post-info">
                        <span itemprop="datePublished">{{ post.created_at | formatTime }} • </span>
                        <span itemprop="categoryPublished"><a href="https://hran.me/category/nichijou/">日常</a> • </span>
                        <span class="comments"><a href="https://hran.me/archives/repair-iphone-at-apple-store.html#comments"><span class="ds-thread-count" data-thread-key="628" data-count-type="comments">20条评论</span></a></span>
                    </div>
                    <p class="cover" v-if="post.cover != ''" v-link="{ name: 'post', params: { id: post.id } }"><img v-bind:src="post.cover"></p>
                    <div class="post-content" itemprop="description">
                        <p></p>
                        <div v-html="post.profile"></div>
                        <p class="more">
                            <a v-link="{ name: 'post', params: { id: post.id } }" title="{{ post.title }}">阅读全文</a>
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
import { Func } from '../../vendor';
import { actions } from '../../vendor/vuex';

export default {
    data () {
        return {
            posts: [],
            name: 'daily',
        };
    },
    methods: {
        bubble (event) {
            this.bubbleDelegation(event, this);
        },
    },
    vuex: {
        actions: {
            bubbleDelegation: actions.bubbleDelegation,
            triggerHook: actions.triggerHook,
        }
    },
    filters: {
        formatTime: Func.formatTime,
    },
    ready () {
        this.bubble('viewposts');
    }
}
</script>
<style>
</style>