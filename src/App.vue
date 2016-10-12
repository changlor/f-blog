<template>
<div id="wrap">
    <leftbar></leftbar>
    <div id="rightbar"><router-view></router-view></div>
</div>
</template>
<script>
import leftbar from './components/leftbar.vue';
import store from './vuex/store.js';

export default {
    components: {
        leftbar
    },
    store,
};
</script>
<style>
@import './highlight/default.min.css';
@import './assets/css/main.css';
@import './assets/css/post.css';
@import './assets/css/editor.css';
@import './assets/css/highlight.css';
@import './assets/css/navbar.css';
@import './assets/css/amuse.css';
@import './assets/css/msgbox.css';
</style>

