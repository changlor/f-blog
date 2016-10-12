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
    <div class="preview-wrap">
        <h2 class="p-title">{{ title }}</h2>
        <ul class="p-meta">
            <li><time>{{ 'sep 2nd' }}</time></li>
        </ul>
        <div class="p-text" v-html="content | marked"></div>
    </div>
    <div class="editor-wrap clearfix">
        <textarea v-bind:class="['editor', { 'transparent': isTransparent }]" v-model="content"></textarea>
        <input class="title" placeholder="标题" v-model="title" />
        <div class="btn-wrap clearfix">
            <a v-on:click="swtichTransparent" class="btn">{{ transparentNotice }}</a>
            <a v-on:click="storeDraft" class="btn">保存草稿</a>
            <a v-on:click="getDraft" class="btn">读取草稿</a>
            <a v-on:click="submitPost" class="btn black">提交文章</a>
            <a class="btn">清空内容</a>
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
            title: '', content: '',
            //
            isTransparent: true,
            //
            transparentNotice: '不要透明',
        };
    },
    methods: {
        swtichTransparent () {
            this.isTransparent = !this.isTransparent;
            this.transparentNotice = this.isTransparent ? '不要透明' : '选择透明';
        },
        submitPost () {
            const callback = (res) => {
                if (!res.success) {
                    this.createMsgbox(res.msg);
                }
            };
            this.eventDelegation({
                params: {
                    categoryId: 3,
                    title: this.title,
                    content: this.content,
                },
                model: 'article',
                method: 'submitPost',
                callback: callback,
            });
        },
        getDraft () {
            const callback = (res) => {
                [this.title, this.content] = [res.title, res.content];
                this.createMsgbox('读取草稿成功OoO');
            };
            this.eventDelegation({
                model: 'Editor',
                method: 'getDraft',
                callback: callback,
            });
        },
        storeDraft () {
            const callback = () => {
                this.createMsgbox('保存草稿成功OoO');
            };
            this.eventDelegation({
                params: { title: this.title, content: this.content },
                model: 'Editor',
                method: 'storeDraft',
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