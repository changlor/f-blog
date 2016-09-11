<template>
<div id="container">
    <div class="editor-wrap clearfix">
        <textarea id="md-editor" v-model="input"></textarea>
        <div id="md-preview" v-html="input | marked"></div>
    </div>
</div>
</template>
<script>
import marked from 'marked';
export default {
    data () {
        return {
            input: '## 发帖前须知'
            + '\n'
            +'任何人可以在此页面编辑发布文章'
            + '\n\n'
            +'1. 包括但不限于'
            +' 投稿 意见'
            + '\n\n'
            +'2. 请勿在此发布'
            +' 色情，庸俗内容'
            + '\n\n'
            +'3. 在此发布的文章会被审核，审核通过即会发布在相应节点',
        }
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
    }
}
</script>
<style scoped>
.editor-wrap {
    padding-top: 80px;
}
#md-editor {
    width: 300px;
    height: 400px;
    float: left;
}
#md-preview {
    padding: 20px;
    width: 400px;
    height: 100%;
    float: left;
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