<template>
<div id="wrap">
    <navbar></navbar>
    <leftbar></leftbar>
    <div id="rightbar"><router-view></router-view></div>
</div>
</template>
<script>
import navbar from './components/navbar.vue';
import leftbar from './components/leftbar.vue';
import store from './vuex/store.js';

export default {
    components: {
        navbar, leftbar
    },
    store,
};
</script>
<style>
body {
    margin: 0px;
}
ul{padding:0;}
article{padding:4em 0;}
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
ol {
    padding-left: 25px;
}
article a{text-decoration:none;}
.p-title{font-size:2.5em;line-height:1.2em;padding:.2em .2em 0;text-align:center;}
.p-title.many{font-size:2em;}
.p a:visited{color:#899;}
.cover img{max-width:100%;display:inline-block;border-radius:.5em;}
.cover img.h{min-height:300px;}
.p-text{word-wrap:break-word;word-break:normal;}
.p-text h3{padding:2em 10px 1em;font-size:1.5em;}
.p-text h4{padding:1em 10px 0;font-size:1.3em;}
.p-text h5{font-size:1.5em;}
.p-text p{line-height:2em;padding:1em 0;}
.p-text img{max-width:100%;}
.p-text p img{max-width:100%;display:block;margin:0em auto;border-radius:.5em;}
.p-text del{color:#999;font-size:.8em;}
.p-text blockquote{background:#EEE;padding:0 2em;color:#333;}
.p-text ul{list-style-type:disc;padding:1em 1em 1em 4em;}
.p-text .more{padding:0 0 2em;text-align:center;text-indent:0;}
.p-text .more a{color:#666;text-decoration:none;}
.p-meta{line-height:2em;text-align:center;padding-bottom:1em;}
.p-meta li{padding:0 .2em;display:inline-block;vertical-align:top;}
.p time{display:block;color:#999;}
#rightbar {
    margin-left: 300px;
}
#container {
    padding: 0 120px;
}
</style>

