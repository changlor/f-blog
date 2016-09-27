<template>
<div class="admin-navbar-wrap">
    <ul v-bind:class="['clearfix', 'admin-navbar']">
        <li><a class="navbar-index" v-link="'/index'">Index</a></li>
        <li><a v-link="'/new'">Add</a></li>
        <li style="float:right;margin-right:160px;"><a v-on:click="backToBlog">Changle</a></li>
    </ul>
    <ul v-bind:class="['clearfix', 'admin-notes']">
        <li>
            <div class="box">
                <div class="cell">
                    <div class="sep5"></div>
                    <span class="fade"><strong>hello, changle</strong></span>
                </div>
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        <div class="sep5"></div>
                        欢迎回来！
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        在此可以发布文章
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="cell">
                    <div class="sep5"></div>
                    <span class="fade">一篇文章必须具备的要素</span>
                </div>
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        <div class="sep5"></div>
                        标题，内容，封面，分隔符
                    </div>
                </div>
            </div>
        </li>
        <li>
            <div class="box">
                <div class="inner">
                    <div class="sep5"></div>
                    <div style="padding: 0 5px;">
                        文章默认以@more为简介分隔符
                    </div>
                </div>
            </div>
        </li>
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
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e2e2;
    width: 180px;
    padding: 8px;
}
.cell {
    padding: 10px;
    font-size: 14px;
    line-height: 120%;
    text-align: left;
    border-bottom: 1px solid #e2e2e2;
}
.inner {
    padding: 10px;
    color: #888;
    font-size: 13px;
    line-height: 150%;
    text-align: left;
}
.admin-navbar {
    margin: 0;
    padding: 10px 100px;
    background-color: #fafafa;
    box-shadow: 1px 1px 1px #ccc;
    position: fixed;
    width: 100%;
}
.admin-navbar li {
    margin: 10px;
    float: left;
}
.admin-navbar li a {
    color: #333;
    text-decoration: none;
    font-size: 17px;
}
.admin-navbar li a.navbar-index {
    color: #999;
}
.admin-notes {
    position: fixed;
    top: 70px;
}
.admin-notes li {
    float: left;
    clear: left;
    margin: 10px 40px;
}
</style>