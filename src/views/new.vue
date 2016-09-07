<template>
<div id="container">
    <div class="editor-wrap clearfix">
        <textarea v-bind:class="['md-editor', { 'md-transparent': isTransparent }]" v-model="input"></textarea>
        <input id="t-title" name="title" placeholder="标题" v-model="title" />
        <div id="md-preview" v-html="input | marked"></div>
        <div id="md-contrast"><pre>{{ input }}</pre></div>
        <a v-on:click="switchTransparent" class="adjust-btn">{{ transparentNotice }}</a>
        <a v-on:click="submitArticle" class="submit-btn">提交</a>
    </div>
</div>
</template>
<script>
import marked from 'marked';
import blogCtrlApi from '../vuex/actions.js';
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
        switchTransparent () {
            this.isTransparent = !this.isTransparent;
            this.isTransparent ? this.transparentNotice = '不要透明' : this.transparentNotice = '选择透明';
        },
        submitArticle () {
            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('content', this.input);
            fetch('http://api.blog.rain/articles', {
                method: 'POST',
                body: formData,
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
        },
    },
    ready () {
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
        },
    }
}
</script>
<style scoped>
.editor-wrap {
    padding-top: 80px;
}
.adjust-btn {
    position: fixed;
    bottom: 200px;
    left: 265px;
    z-index: 30;
    cursor: pointer;
}
.submit-btn {
    position: fixed;
    bottom: 150px;
    left: 281px;
    z-index: 30;
    cursor: pointer;
}
#md-preview {
    padding: 20px;
    width: 400px;
    height: 100%;
    float: left;
}
#t-title {
    background-color: #fafafa;
    position: fixed;
    bottom: 50px;
    font-size: 16px;
    outline: none;
    border: 0;
    border-radius: 3px;
    padding: 10px 15px;
    width: 612px;
}
#t-title:hover {
    opacity: 0.1;
}
.md-editor {
    position: fixed;
    width: 600px;
    height: 100px;
    bottom: 100px;
    opacity: 0.9;
}
.md-transparent:hover {
    opacity: 0.2;
}
#md-contrast {
    opacity: 0.6;
    background-color: #f6f6f6;
    border-radius: 10px;
    padding: 5px;
    transform: scale(0.4);
    position: fixed;
    width: 400px;
    min-height: 600px;
    bottom: -180px;
    right: 20px;
}
#md-contrast:hover {
    opacity: 0.1;
}
textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
}
code {
    color: #f66;
}
</style>