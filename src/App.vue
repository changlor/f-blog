<template>
<div class="wrap">
    <div v-if="isAdmin" class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <admin></admin>
        <main class="mdl-layout__content">
            <router-view></router-view>
        </main>
    </div>
    <div v-if="!isAdmin">
        <custom></custom>
        <router-view></router-view>
    </div>
</div>
</template>
<style src="material-design-lite/material.css"></style>
<style src="material-design-icons/iconfont/material-icons.css"></style>
<script>
import admin from './components/admin.vue';
import custom from './components/custom.vue';
import common from './components/common.vue';
import store from './vuex/store.js';

export default {
    data () {
        return {
            isAdmin: false,
        };
    },
    components: {
        admin, custom
    },
    store,
};
</script>
<style>
@import './assets/css/custom.css';
@import './assets/css/navbar.css';
@import './assets/css/post.css';
@import './assets/css/main.css';
@import './assets/css/highlight.css';
</style>

