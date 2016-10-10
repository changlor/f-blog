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
            <li class="p-preview clearfix" v-for="article in articles">
                <div class="inner clearfix">
                    <div class="p-title">{{ article.title }}</div>
                    <a class="edit-btn" v-link="{ name: 'edit', params: { tid: article.id } }">edit</a>
                    <a class="scan-btn" v-link="{ name: 'topic', params: { tid: article.id } }">scan</a>
                    <a class="del-btn">del</a>
                </div>
            </li>
        </ul>
        <div class="group-btn-wrap clearfix">
            <a class="previous-btn adjust-btn">查看评论</a>
            <a class="previous-btn adjust-btn">查看文章</a>
            <a class="previous-btn adjust-btn">上一页</a>
            <a class="next-btn adjust-btn">下一页</a>
        </div>
    </div>
</div>
</template>
<script>
import marked from 'marked';
import blogCtrlApi from '../vuex/actions.js';
import blogFetchApi from '../common/fetch.js';
import localStorageApi from '../common/store.js';
export default {
    data () {
        return {
            articles: '',
        }
    },
    methods: {
        fetchArticles: blogFetchApi.fetchData,
    },
    ready () {
        this.updateAdminStatus(true);
        const fetchArticlesCallback = (response) => {
            console.log(response.data);
            for (let index in response.data) {
                this.articles = response.data;
            }
        };
        this.fetchArticles('posts', fetchArticlesCallback)
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
    vuex: {
        actions: {
            createNewMsgbox: blogCtrlApi.createNewMsgbox,
            updateAdminStatus: blogCtrlApi.updateAdminStatus,
        },
    }
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