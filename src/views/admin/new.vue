<template>
<div class="container admin">
    <div class="title">
        <h3>撰写新文章</h3>
    </div>
    <div class="main">
        <div class="grid">
            <div class="new-post grid-cell grid-cell--9-col">
                <div class="brief"><span>标题: </span></div>
                <div class="title">
                    <input type="text" v-model="title" />
                </div>
                <div class="brief"><span>文章: </span></div>
                <div class="editor grid">
                    <div class="editor-wrap">
                        <textarea v-model="content"></textarea>
                    </div>
                </div>
                <div class="edit">
                    <div class="row">
                        <div class="spacer"></div>
                        <button>保存草稿</button>
                        <button class="primary">发布文章</button>
                    </div>
                </div>
            </div>
            <div class="grid-cell grid-cell--3-col"></div>
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
            transparentNotice: 'Untransparent',
        };
    },
    methods: {
        swtichTransparent () {
            this.isTransparent = !this.isTransparent;
            this.transparentNotice = this.isTransparent ? 'Untransparent' : 'Transparent';
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