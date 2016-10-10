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
                        在此可以发布文章
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="cell">
                    <div class="sep5"></div>
                    <span class="fade">文章必要的内容</span>
                </div>
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        <div class="sep5"></div>
                        标题，封面，简介记号@more，正文
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        默认以@more为简介分界记号
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div class="editor-wrap clearfix">
        <textarea v-bind:class="['md-editor', { 'md-transparent': isTransparent }]" v-model="input"></textarea>
        <input id="t-title" name="title" placeholder="标题" v-model="title" />
        <h2 class="title-preview">{{ title }}</h2>
        <div id="md-preview" class="p-text" v-html="input | marked"></div>
        <!--
        <div id="md-contrast"><pre>{{ input }}</pre></div>
        -->
        <div class="group-btn-wrap clearfix">
            <a v-on:click="switchTransparent" class="transparent-btn adjust-btn">{{ transparentNotice }}</a>
            <a v-on:click="savedArticleDarft" class="cache-btn adjust-btn">保存草稿</a>
            <a v-on:click="fetchArticleDarft" class="darft-btn adjust-btn">读取草稿</a>
            <a v-on:click="publishArticle" class="submit-btn adjust-btn">提交文章</a>
            <a v-on:click="clearArticle" class="empty-btn adjust-btn">清空内容</a>
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
            input: '',
            title: '',
            isTransparent: true,
            transparentNotice: '不要透明',
        }
    },
    methods: {
        sendArticle: blogFetchApi.sendImportantData,
        savedDarft: localStorageApi.savedDarft,
        fetchDarft: localStorageApi.fetchDarft,
        clearArticle () {
            this.title = '';
            this.input = '';
            this.createNewMsgbox('清除成功啦OoO');
        },
        switchTransparent () {
            this.isTransparent = !this.isTransparent;
            this.isTransparent ? this.transparentNotice = '不要透明' : this.transparentNotice = '选择透明';
        },
        savedArticleDarft () {
            this.savedDarft({ title: this.title, content: this.input });
            this.createNewMsgbox('保存成功啦OoO');
        },
        fetchArticleDarft () {
            const darft = this.fetchDarft();
            this.title = darft.title;
            this.input = darft.content;
            this.createNewMsgbox('读取成功啦OoO');
        },
        publishArticle () {
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.input);
            let headers = new Headers();
            headers.append("Auth-Token", localStorageApi.fetchToken());
            const sendArticleCallback = (response) => {
                if (response.success) {
                    this.createNewMsgbox(true, '发射成功啦QoQ');
                } else {
                    this.createNewMsgbox(true, '失，失败了OoO');
                }
            };
            this.sendArticle('post', headers, formData, sendArticleCallback);
            this.input = '';
            this.title = '';
        },
    },
    ready () {
        this.updateAdminStatus(true);
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
            addNewTopic: blogCtrlApi.addNewTopic,
            createNewMsgbox: blogCtrlApi.createNewMsgbox,
            updateAdminStatus: blogCtrlApi.updateAdminStatus,
        },
    }
}
</script>