<template>
<div id="container">
    <div class="editor-wrap clearfix">
        <div class="profile-preview mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">profile</h2>
            </div>
            <textarea class="profile mdl-card__supporting-text" v-html="profile"></textarea>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                    preview
                </a>
            </div>
        </div>
        <div class="body-preview mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">body</h2>
            </div>
            <textarea class="body mdl-card__supporting-text" v-html="body"></textarea>
            <div class="mdl-card__actions mdl-card--border">
                <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                    preview
                </a>
            </div>
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
            //
            isPreview: false,
            //
            switchPreviewNotice: '预览修改', switchPreviewTextNotice: '预览简介',
            //
            postId: false, categoryId: false, isPreviewProfile: false,
            //
            title: '', profile: '', body: '',
            //
            categories: {
                setedValue: '选择分类',
                selectedStatus: false,
                options: [
                    { value: '日常', id: '3' }
                ],
            },
        };
    },
    methods: {
        switchPreview () {
            this.isPreview = !this.isPreview;
            this.switchPreviewNotice = this.isPreview ? '返回预览' : '预览修改';
        },
        switchPreviewText () {
            this.isPreviewProfile = !this.isPreviewProfile;
            this.switchPreviewTextNotice = this.isPreviewProfile ? '预览正文' : '预览简介';
        },
        selected (selector) {
            selector.selectedStatus = true;
        },
        cancelSelected (selector) {
            selector.selectedStatus = false;
        },
        setCategory (option) {
            this.categoryId = option.id;
            this.categories.setedValue = option.value;
            this.categories.selectedStatus = false;
        },
        updatePost () {
            const callback = (res) => {
                console.log(res);
            };
            this.eventDelegation({
                params: {
                    categoryId: this.categoryId,
                    postId: this.postId,
                    title: this.title,
                    profile: this.profile,
                    body: this.body,
                },
                model: 'Article',
                method: 'updatePost',
                callback: callback,
            });
        },
        fetchPost () {
            const callback = (res) => {
                [this.title, this.profile, this.body] = [
                    res.data.title,
                    res.data.profile,
                    res.data.body
                ];
            };
            this.eventDelegation({
                params: { postId: this.postId },
                model: 'Article',
                method: 'getPost',
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
        this.postId = this.$route.params.tid;
        this.switchAdminModes(true);
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
        marked: marked,
    },
}
</script>
<style>
.profile-preview {
    top: 100px;
    position: fixed;
    left: 300px;
    width: 400px;
    height: 500px;
    padding: 10px 20px;
}
.profile-preview textarea {
    border: 0;
    height: 400px;
    width: 328px;
    background-color: #fafafa;
    overflow-y: auto;
    outline: none;
    resize: none;
    border-radius: 5px;
}
.body-preview {
    top: 100px;
    position: fixed;
    left: 750px;
    width: 560px;
    height: 300px;
    padding: 10px 20px;
}
.body-preview textarea {
    border: 0;
    height: 200px;
    width: 488px;
    background-color: #fafafa;
    overflow-y: auto;
    outline: none;
    resize: none;
    border-radius: 5px;
}
</style>