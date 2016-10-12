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
            <input class="title" name="title" placeholder="标题" v-model="title" />
        </div>
        <div class="preview-wrap" v-else>
            <h2 class="p-title">{{ title }}</h2>
            <div class="p-text" v-show="!isPreviewProfile" v-html="body | marked"></div>
            <div class="p-text" v-else v-html="profile | marked"></div>
        </div>
        <div class="btn-wrap clearfix">
            <div class="select-btn-wrap">
                <a v-on:click="selected(categories)" class="btn">{{ categories.setedValue }}</a>
                <div v-on:click="cancelSelected(categories)" class="global-shadow"  v-show="categories.selectedStatus"></div>
                <div class="options-btn-wrap" v-show="categories.selectedStatus">
                    <span v-on:click="setCategory(option)" v-for="option in categories.options" type="button" >{{ option.value }}</span>
                </div>
            </div>
            <a class="btn">文章:{{ postId }}</a>
            <a class="btn" v-on:click="switchPreviewText" v-show="isPreview">{{ switchPreviewTextNotice }}</a>
            <a class="btn black" v-on:click="switchPreview">{{ switchPreviewNotice }}</a>
            <a class="btn" v-show="!isPreview">保存草稿</a>
            <a class="btn" v-show="!isPreview">读取草稿</a>
            <a class="btn">清空内容</a>
            <a v-on:click="updatePost" class="btn black">提交修改</a>
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