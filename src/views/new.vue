<template>
<div id="container">
    <div class="editor-wrap clearfix">
        <textarea v-bind:class="['md-editor', { 'md-transparent': isTransparent }]" v-model="input"></textarea>
        <input id="t-title" name="title" placeholder="标题" v-model="title" />
        <div id="md-preview" v-html="input | marked"></div>
        <div id="md-contrast"><pre>{{ input }}</pre></div>
        <a v-on:click="switchTransparent" class="adjust-btn">{{ transparentNotice }}</a>
        <a v-on:click="publishArticle" class="submit-btn">提交</a>
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
            input: '## 发帖前须知',
            title: '',
            isTransparent: true,
            transparentNotice: '不要透明',
        }
    },
    methods: {
        sendArticle: blogFetchApi.sendImportantData,
        switchTransparent () {
            this.isTransparent = !this.isTransparent;
            this.isTransparent ? this.transparentNotice = '不要透明' : this.transparentNotice = '选择透明';
        },
        publishArticle () {
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.input);
            let headers = new Headers();
            headers.append("Auth-Token", localStorageApi.fetchToken());
            const sendArticleCallback = (response) => {
                if (response.success) {
                    this.createNewMsgBox(true, '发射成功啦~QwQ');
                } else {
                    this.createNewMsgBox(true, '失，失败了OoO');
                }
            };
            this.sendArticle('articles', headers, formData, sendArticleCallback);
            this.input = '';
            this.title = '';
        },
    },
    ready () {
        if (!localStorageApi.fetchAuthor('changle')) {
            this.$route.router.go('/contribute');
        }
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
            createNewMsgBox: blogCtrlApi.createNewMsgBox,
        },
    }
}
</script>