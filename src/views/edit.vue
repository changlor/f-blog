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
                        在此可以对文章，评论进行修改
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="cell">
                    <div class="sep5"></div>
                    <span class="fade">文章，评论要求</span>
                </div>
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        <div class="sep5"></div>
                        只对文本内容进行编辑，而不修改其他必要信息
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        点击预览修改可以预览
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div class="editor-wrap clearfix">
        <div class="unpreview-wrap" v-show="!isPreview">
            <textarea class="t-body" placeholder="内容" v-model="body"></textarea>
            <textarea class="t-profile" placeholder="简介" v-model="profile"></textarea>
            <input id="t-title" name="title" placeholder="标题" v-model="title" />
        </div>
        <div class="preview-wrap" v-else>
            <h2 class="title-preview">{{ title }}</h2>
            <div v-show="!isPreviewProfile" class="md-preview" class="p-text" v-html="body | marked"></div>
            <div v-else class="md-preview" class="p-text" v-html="profile | marked"></div>
        </div>
        <div class="group-btn-wrap clearfix">
            
            <div class="select-btn-wrap">
                <a class="adjust-btn" v-on:click="selected('category')">{{ category.setedValue }}</a>
                <div class="global-shadow" v-on:click="cancelSelected('category')" v-show="category.selectedStatus"></div>
                <div class="options-btn-wrap" v-show="category.selectedStatus">
                    <span v-for="category in category.options" type="button" v-on:click="setArticleCategoryId($index)">{{ category.value }}</span>
                </div>
            </div>
            <a class="adjust-btn">文章:{{ articleId }}</a>
            <a v-show="isPreview" v-on:click="previewArticleProfile" class="preview-switch-btn adjust-btn">{{ isPreviewProfileNotice }}</a>
            <a v-on:click="previewArticle" class="preview-btn adjust-btn">{{ isPreviewNotice }}</a>
            <a v-show="!isPreview" v-on:click="savedArticleDarft" class="save-darft-btn adjust-btn">保存草稿</a>
            <a v-show="!isPreview" v-on:click="fetchArticleDarft" class="fetch-darft-btn adjust-btn">读取草稿</a>
            <a v-on:click="clearArticle" class="empty-btn adjust-btn">清空内容</a>
            <a v-on:click="publishArticle" class="submit-btn adjust-btn">提交修改</a>
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
            articleId: false,
            categoryId: false,
            body: '',
            profile: '',
            title: '',
            isPreview: false,
            isPreviewNotice: '预览修改',
            isPreviewProfile: false,
            isPreviewProfileNotice: '预览简介',
            category: {
                selectedStatus: false,
                setedValue: '文章类型',
                options: [
                    { value: '日常', id: 1 },
                    { value: '代码', id: 2 },
                    { value: '其他', id: -1 }
                ]
            },
        }
    },
    methods: {
        sendArticle: blogFetchApi.sendImportantData,
        fetchArticles: blogFetchApi.fetchData,
        savedDarft: localStorageApi.savedDarft,
        fetchDarft: localStorageApi.fetchDarft,
        selected (select) {
            this[select].selectedStatus = true;
        },
        cancelSelected (select) {
            this[select].selectedStatus = false;
        },
        setArticleCategoryId (index) {
            this.category.setedValue = this.category.options[index].value;
            this.categoryId = this.category.options[index].id;
            this.category.selectedStatus = false;
        },
        clearArticle () {
            this.title = '';
            this.input = '';
            this.createNewMsgbox('清除成功啦OoO');
        },
        previewArticleProfile () {
            this.isPreviewProfile = !this.isPreviewProfile;
            this.isPreviewProfile
            ? this.isPreviewProfileNotice = '预览全文'
            : this.isPreviewProfileNotice = '预览简介';
        },
        savedArticleDarft () {
            this.savedDarft({ title: this.title, content: this.input });
            this.createNewMsgbox('保存成功啦OoO');
        },
        fetchArticleDarft () {
            const darft = this.fetchDarft();
            this.title = darft.title;
            this.profile = darft.profile;
            this.body = darft.body;
            this.createNewMsgbox('读取成功啦OoO');
        },
        previewArticle () {
            this.isPreview = !this.isPreview;
            this.isPreview
            ? this.isPreviewNotice = '返回预览'
            : this.isPreviewNotice = '预览修改';
        },
        publishArticle () {
            const data = JSON.stringify({
                title: this.title,
                body: this.body,
                profile: this.profile,
                categoryId: this.categoryId,
            });
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            headers.append('Auth-Token', localStorageApi.fetchToken());
            const sendArticleCallback = (response) => {
                if (response.success) {
                    this.createNewMsgbox(true, '发射成功啦QoQ');
                } else {
                    this.createNewMsgbox(true, '失，失败了OoO');
                }
            };
            this.sendArticle(`post/${this.articleId}`, headers, data, sendArticleCallback);
        },
    },
    ready () {
        this.articleId = this.$route.params.tid;
        this.updateAdminStatus(true);
        const fetchArticlesCallback = (response) => {
            this.articleId = response.data.id;
            this.title = response.data.title;
            this.profile = response.data.profile;
            this.body = response.data.body;
        };
        this.fetchArticles(`post/${this.articleId}`, fetchArticlesCallback)
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
<style>
.t-profile {
    position: absolute;
    height: 90px;
    width: 750px;
    top: 155px;
    left: 420px;
    background-color: rgb(225, 232, 237);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    font-size: 15px;
}
.t-body {
    position: absolute;
    height: 200px;
    width: 750px;
    top: 303px;
    left: 420px;
    background-color: rgb(225, 232, 237);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    font-size: 15px;
}
.options-btn-wrap {
    z-index: 4;
    position: absolute;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    background-color: #fafafa;
    padding: 10px;
    margin-top: 30px;
    margin-left: 10px;
}
.options-btn-wrap span {
    word-break: keep-all;
    padding: 8px 15px;
    float: left;
    clear: left;
}
</style>