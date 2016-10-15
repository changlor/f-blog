<template>
<div>
    <div v-if="isAdmin" class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
        <admin></admin>
        <main class="mdl-layout__content">
            <router-view></router-view>
        </main>
    </div>
    <div class="wrap" v-if="!isAdmin">
        <custom></custom>
        <router-view></router-view>
    </div>
    <common></common>
</div>
</template>
<style src="material-design-lite/material.css"></style>
<style src="material-design-icons/iconfont/material-icons.css"></style>
<script>
import store from './vuex/store.js';
import admin from './components/admin.vue';
import custom from './components/custom.vue';
import common from './components/common.vue';

export default {
    data () {
        return {
            isAdmin: true,
        };
    },
    components: {
        admin, custom, common
    },
    store,
};
</script>
<style>
@import './assets/css/main/main.css';
@import './assets/css/components/post.css';
@import './assets/css/components/navbar.css';
@import './assets/css/components/highlight.css';
@import './assets/css/nouser/custom.css';
</style>

