<template>
<div>
    <div class="wrap">
        <system></system>
        <theme></theme>
        <main class="body">
            <router-view></router-view>
        </main>
    </div>
</div>
</template>
<script>
import { store } from './vendor';
import system from './vendor/module/system';
import theme from './vendor/module/theme';
export default {
    data () {
        return {
            isAdmin: false,
        };
    },
    components: {
        system, theme
    },
    store,
};
</script>
<style>
@import './assets/css/main/main.css';
@import './assets/css/main/style.css';
@import './assets/css/main/blog.css';
@import './assets/css/components/navbar.css';
@import './assets/css/components/msgbox.css';
@import './assets/css/components/list.css';
@import './assets/css/main/font-awesome.min.css';
</style>

