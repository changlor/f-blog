<template>
<div class="b-container">
    <div class="new-post clearfix">
        <div id="title">
            <input placeholder="标题" />
        </div>
        <div id="ctrl">
            <div class="bar clearfix">
                <span class="add-tag">
                    标签：<input />
                    <a>papapa</a>
                </span>
                <a class="submit">发布文章</a>
                <a class="reset">清空内容</a>
            </div>
        </div>
        <div id="tool">
            <i class="fa fa-bold"></i>
            <i class="fa fa-italic"></i>
            <i class="fa fa-header"></i>
            <span class="bar"></span>
            <i class="fa fa-quote-left"></i>
            <i class="fa fa-list-ul"></i>
            <i class="fa fa-list-ol"></i>
            <span class="bar"></span>
            <i class="fa fa-link"></i>
            <i class="fa fa-picture-o"></i>
        </div>
        <div id="edit">
            <textarea placeholder="正文"></textarea>
        </div>
        <div id="post">
            <article class="post">
                <h2 class="post-title">{{ title }}</h2>
                <ul class="post-meta">
                    <li><time>110</time></li>
                    <li> • 阅读: 374</li>
                    <li> • <a href="https://hran.me/category/nichijou/">日常</a></li>
                </ul>
                <p class="cover" v-if="cover != ''"><img v-bind:src="cover"></p>
                <div class="post-content">
                    <p></p>
                    <div v-html="content"></div>
                </div>
                <div class="tags">
                    <div class="dkeywords">
                        <div class="keywords">标签: <a href="https://hran.me/tag/Apple-Store/">Apple Store</a>, <a href="https://hran.me/tag/%E5%94%AE%E5%90%8E/">售后</a></div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            title: 'asd', content: '', cover: '',
        };
    }
}
</script>
<style>
.b-container {
    margin: 0 40px;
}
.new-post {
    margin-top: 20px;
    width: 100%;
    padding: 5px;
    border: 1px dashed #bbb;
}
.new-post #edit {
    border-right: 1px dashed #bbb;
}
.new-post #ctrl .bar {
    width: 100%;
    display: block;
    padding-right: 10px;
}
.new-post #tool i {
    margin: 0 10px;
}
.new-post #tool .bar {
    margin: 0 5px;
    border-left: 1px solid #bbb;
}
.bar a {
    padding: 2px 10px;
    border-radius: 2px;
    font-size: 15px;
    float: right;
    margin-left: 5px;
}
.bar .add-tag {
    padding: 2px 10px;
    border-radius: 2px;
    padding-left: 0;
    font-size: 15px;
    color: #777;
    float: left;
}
.add-tag input {
    font-size: 14px;
    border: 0;
    border-bottom: 1px solid #bbb;
    width: 50px;
}
.add-tag a {
    margin-right: .3125rem;
    padding: .25rem .5rem;
    border-radius: .1875rem;
    background: rgba(153,153,153,0.1);
    color: #999;
    text-decoration: none;
    font-size: .75rem;
}
.bar .reset {
    border: 1px dashed #bbb;
    margin-right: 10px;
    color: #666;
}
.bar .submit {
    color: #fff;
    background-color: #1abc9c;
}
.new-post #title, .new-post #tool, .new-post #ctrl {
    padding: 10px;
    border-bottom: 1px dashed #bbb;
}
.new-post #title input {
    border: 0;
    font-size: 15px;
    width: 100%;
    font-family: 'Merriweather', 'Open Sans', 'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'Segoe UI Emoji', 'Segoe UI Symbol', Helvetica, Arial, sans-serif;
}
.new-post #edit, .new-post #post {
    padding: 10px;
    float: left;
    height: 600px;
    width: 50%;
}
.new-post #edit textarea {
    font-size: 15px;
    border: 0;
    width: 100%;
    height: 100%;
    resize: none;
    font-family: 'Merriweather', 'Open Sans', 'Hiragino Sans GB', 'Microsoft Yahei', 'WenQuanYi Micro Hei', 'Segoe UI Emoji', 'Segoe UI Symbol', Helvetica, Arial, sans-serif;
}
</style>