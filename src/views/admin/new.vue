<template>
<div class="container admin__new">
<div class="mdl-layout--fixed-tabs mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
    <div class="mdl-tabs__tab-bar">
        <a href="#posts-panel" class="mdl-layout__tab mdl-tabs__tab is-active">Edit</a>
        <a href="#operate-panel" class="mdl-layout__tab mdl-tabs__tab">Operate</a>
    </div>
    <div class="mdl-tabs__panel is-active" id="posts-panel">
        <div class="editor">
            <div class="mdl-textfield mdl-js-textfield title">
                <input class="mdl-textfield__input cus-font__family" type="text" id="sample1" v-model="title">
                <label class="mdl-textfield__label cus-font__family" for="sample1">Title...</label>
            </div>
            <div class="preview">
                <div class="p-title" v-html="title"></div>
                <div class="p-text" v-html="content | marked"></div>
            </div>
            <div class="mdl-textfield mdl-js-textfield content">
                <button v-on:click="swtichTransparent" class="transparent-btn mdl-button mdl-js-button mdl-button--primary">
                    {{ transparentNotice }}
                </button>
                <textarea v-bind:class="[isTransparent ? 'transparent' : '']" type="text" v-model="content"></textarea>
            </div>
        </div>
    </div>
    <div class="mdl-tabs__panel" id="operate-panel">
        <div class="operate">
            <div class="dashboard">
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">
                    draft: get
                </button>
                <button class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--raised">
                    draft: save
                </button>
                <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
                    publish
                </button>
            </div>
            <div class="preview">
                <div class="p-title" v-html="title"></div>
                <div class="p-text" v-html="content | marked"></div>
            </div>
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
        this.$nextTick(()=>{
            componentHandler.upgradeDom();
        });
    },
    filters: {
        marked: marked,
    },
}
</script>