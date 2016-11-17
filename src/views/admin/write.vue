<template>
<div class="b-container">
    <div class="new-post clearfix">
        <div class="post-option">
            <div class="title">
                <input placeholder="标题" v-model="title" />
            </div>
        </div>
        <div class="post-option">
            <div class="submit">
                <div class="clearfix">
                    <span class="tags">
                        标签：<input @keyup.enter="addTag" v-model="tag" />
                        <span v-for="tag in tags" track-by="$index">{{ tag }}<a @click="removeTag($index)"> x</a></span>
                    </span>
                    <a class="btn primary" @click="submitPost">发布文章</a>
                    <a class="btn">清空内容</a>
                </div>
            </div>
        </div>
        <div class="post-option">
            <div class="toolbar">
                <i class="fa fa-bold"></i>
                <i class="fa fa-italic"></i>
                <i class="fa fa-header"></i>
                <i class="separator"></i>
                <i class="fa fa-quote-left"></i>
                <i class="fa fa-list-ul"></i>
                <i class="fa fa-list-ol"></i>
                <i class="separator"></i>
                <i class="fa fa-link"></i>
                <i class="fa fa-picture-o"></i>
                <list :options="categories" @select="selectPageId"></list>
            </div>
        </div>
        <div class="post-option">
            <div class="grid">
                <div class="edit">
                    <textarea placeholder="正文" v-model="content"></textarea>
                </div>
                <div class="preview">
                    <div id="post">
                        <article class="post">
                            <h2 class="post-title">{{ title }}</h2>
                            <ul class="post-meta">
                                <li><time>{{ created_at | formatTime }}</time></li>
                                <li> • 因雨而生</li>
                                <li> • <a>{{ pageValue }}</a></li>
                            </ul>
                            <p class="cover" v-if="cover != ''"><img v-bind:src="cover"></p>
                            <div class="post-content">
                                <p></p>
                                <div v-html="content | parseMarkdown"></div>
                            </div>
                            <div class="tags">
                                <div class="dkeywords">
                                    <div class="keywords">
                                        标签: 
                                        <a v-for="tag in tags" track-by="$index">{{ tag }}</a>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import list from '../../components/list';
import { Func } from '../../vendor';
import { actions } from '../../vendor/vuex';

export default {
    data () {
        return {
            title: '', content: '', cover: '', created_at: 0,
            categories: [
                {
                    value: '默认',
                    id: 1,
                },
                {
                    value: '日常',
                    id: 2,
                }
            ],
            pageId: 0, pageValue: '默认',
            tag: '', tags: [],
        };
    },
    vuex: {
        actions: {
            bubbleDelegation: actions.bubbleDelegation,
            triggerHook: actions.triggerHook,
        }
    },
    methods: {
        bubble (event) {
            this.bubbleDelegation(event, this);
        },
        trigger (subscription) {
            this.triggerHook(subscription, this);
        },
        submitPost () {
            this.bubble('submitpost');
        },
        addTag () {
            this.tag = Func.trim(this.tag);
            if (!Func.empty(this.tag)) {
                this.tags.push(this.tag);
            }
            this.tag = '';
        },
        removeTag (index) {
            this.tags.splice(index, 1);
        },
        selectPageId (option) {
            this.pageId = option.id;
            this.pageValue = option.value;
        },
    },
    filters: {
        formatTime: Func.formatTime,
        parseMarkdown: Func.parseMarkdown,
    },
    components: {
        list,
    },
    ready () {
        this.created_at = Func.time();
    },
}
</script>