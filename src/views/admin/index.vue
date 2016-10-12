<template>
<div id="container">
    <ul class="clearfix admin-notes">
        <li>
            <div class="box">
                <div class="cell">
                    <div class="sep5"></div>
                    <span class="fade"><strong>hello, changle</strong></span>
                </div>
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        <div class="sep5"></div>
                        欢迎回来！
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        在此可以对文章，评论进行操作
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="cell">
                    <div class="sep5"></div>
                    <span class="fade">可以对进行的操作</span>
                </div>
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        <div class="sep5"></div>
                        修改，删除，浏览
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        点击查看文章，查看评论切换操作对象
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div class="p-preview-wrap">
        <ul>
            <li class="p-preview clearfix" v-for="post in posts">
                <div class="inner clearfix">
                    <div class="p-title">{{ post.title }}</div>
                    <a class="edit-btn" v-link="{ name: 'edit', params: { tid: post.id } }">edit</a>
                    <a class="scan-btn" v-link="{ name: 'topic', params: { tid: post.id } }">scan</a>
                    <a class="del-btn">del</a>
                </div>
            </li>
        </ul>
        <div class="btn-wrap clearfix">
            <a class="btn">查看评论</a>
            <a class="btn">查看文章</a>
            <a class="btn">上一页</a>
            <a class="btn">下一页</a>
        </div>
    </div>
</div>
</template>
<script>
import marked from 'marked';
import hljs from '../../lib/highlight/highlight.js';
import getters from '../../vuex/getters';
import actions from '../../vuex/actions';

export default {
    data () {
        return {
            posts: [],
        };
    },
    methods: {
        getPosts () {
            const callback = (res) => {
                this.posts = res.data;
            };
            this.eventDelegation({
                params: {
                    category: 'index',
                },
                model: 'Article',
                method: 'getPosts',
                callback: callback,
            });
        },
    },
    vuex: {
        getters: {
            count: getters.getMsgboxCount,
        },
        actions: {
            switchAdminModes: actions.switchAdminModes,
            eventDelegation: actions.eventDelegation,
            createMsgbox: actions.createMsgbox,
        },
    },
    ready () {
        this.switchAdminModes(true);
        this.getPosts();
    },
}
</script>
<style>
.p-preview-wrap {
    margin-top: 95px;
}
.p-preview {
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    border-radius: 4px;
    overflow: hidden;
}
.p-preview .p-title {
    float: left;
    font-size: 17px;
    font-weight: bold;
    padding-left: 15px;
    color: #899;
}
.inner a {
    float: right;
    padding: 2px 5px;
    background-color: #000;
    color: #fff;
    margin-left: 5px;
    border-radius: 3px;
}
.previous-btn, .next-btn {
    width: 64px;
    text-align: center;
}
</style>