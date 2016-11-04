<template>
<div>
    <common></common>
    <div class="wrap">
        <custom></custom>
        <main class="body">
            <router-view></router-view>
        </main>
        <bottom></bottom>
    </div>
</div>
</template>
<script>
import store from './vuex/store.js';
import admin from './components/admin.vue';
import bottom from './components/bottom.vue';
import custom from './components/custom.vue';
import common from './components/common.vue';

export default {
    data () {
        return {
            isAdmin: false,
        };
    },
    components: {
        admin, custom, common, bottom
    },
    store,
};
</script>
<style>
@import './assets/css/main/grid.css';
@import './assets/css/main/font-awesome.min.css';
@import './assets/css/main/main.css';
@import './assets/css/main/style.css';
@import './assets/css/main/blog.css';
@import './assets/css/components/navbar.css';
@import './assets/css/components/msgbox.css';
</style>

