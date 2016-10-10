<template>
<div class="admin-navbar-wrap">
    <ul v-bind:class="['clearfix', 'admin-navbar']">
        <li><a class="navbar-index" v-link="'/index'">Index</a></li>
        <li><a v-link="'/new'">Add</a></li>
        <li style="float:right;margin-right:160px;"><a v-on:click="backToBlog">Changle</a></li>
    </ul>
</div>
</template>
<script>
import blogCtrlApi from '../vuex/actions.js';

export default {
    methods: {
        backToBlog () {
            this.updateAdminStatus(false);
            this.$route.router.go('/daily');
        },
    },
    vuex: {
        actions: {
            updateAdminStatus: blogCtrlApi.updateAdminStatus,
        },
    }
}
</script>
<style>
.box {
    background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 0px 2px 3px rgb(225, 232, 237);
    border-bottom: 1px solid #e2e2e2;
    width: 200px;
    overflow: hidden;
}
.cell {
    padding: 10px;
    font-size: 15px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #efefef;
    padding: 10px;
    color: #f1f1f1;
    background-color: #333;
}
.inner {
    padding: 17px 10px;
    background-color: rgb(225, 232, 237);
    font-size: 15px;
    line-height: 150%;
    text-align: left;
}
.admin-navbar {
    top: 0;
    margin: 0;
    padding: 10px 100px;
    background-color: rgb(225, 232, 237);
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    position: fixed;
    width: 100%;
}
.admin-navbar li {
    margin: 10px;
    float: left;
}
.admin-navbar li a {
    color: #555;
    text-decoration: none;
    font-size: 18px;
}
.admin-navbar li a.navbar-index {
    color: #999;
}
.admin-notes {
    position: fixed;
    left: 0;
    top: 70px;
}
.admin-notes li {
    float: left;
    clear: left;
    margin: 10px 40px;
}
</style>