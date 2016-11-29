<template>
<div class="container">
    <div class="row">
        <div class="logs">
            <h1 class="logs-title">更新日志</h1>
            <ul class="logs-items">
                <li class="logs-item">
                    <h3>2016-11-21 更新</h3>
                    <ol>
                        <li>新增更新日志页面</li>
                        <li>改进了获取用户信息的方法，新增了一个自定义函数readUserInfo读取localstorage用户信息</li>
                        <li>将后台跳转的逻辑从事件中转站分离，移至model/Auth.js</li>
                        <li>(后台)修复返回登陆授权字段，用户名为null的错误</li>
                        <li>修复导航栏前后台切换动画导致的导航栏图标消失的错误</li>
                    </ol>
                </li>
                <li class="logs-item">
                    <h3>2016-11-27 更新</h3>
                    <ol>
                        <li>更换更好的lib库js文件export方式</li>
                        <li>改写了库的fetch方法，合并get，post，put，delete</li>
                    </ol>
                </li>
                <li class="logs-item">
                    <h3>2016-11-28 更新</h3>
                    <ol>
                        <li>更换了一下导航栏</li>
                        <li>修改了一下日志页面的样式</li>
                        <li>修复导航栏点击之后不退回影响体验因素</li>
                    </ol>
                </li>
                <li class="logs-item">
                    <h3>2016-11-29 更新</h3>
                    <ol>
                        <li>将所有的无效路由根据登陆与否跳转到不同首页</li>
                        <li>将储存登陆状态改成sessionstorage</li>
                    </ol>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
import { Func } from '../../vendor/lib';
import { actions } from '../../vendor/vuex';

export default {
    data () {
        return {
            //文章主体部分
            post: {},
        };
    },
    vuex: {
        actions: {
            bubbleDelegation: actions.bubbleDelegation,
            triggerHook: actions.triggerHook,
        }
    },
    methods: {
        bubble (event) {
            this.bubbleDelegation(event, this);
        },
        trigger (subscription) {
            this.triggerHook(subscription, this);
        },
    },
    filters: {
        parseMarkdown: Func.parseMarkdown,
        formatTime: Func.formatTime,
    },
}
</script>
<style>
.logs {
    padding-top: 3.125rem;
}
.logs-title {
    margin-bottom: .625rem;
    padding-bottom: .3125rem;
    color: #333;
    font-size: 2.5rem;
    transition: all .5s;
    font-weight: 300;
    text-align: center;
}
.logs-item {
    margin-bottom: 50px;
    list-style: none;
}
.logs-item h3 {
    margin: 0;
    padding: 0 .9375rem;
    border-left: .25rem solid #ddd;
    color: #777;
    font-size: 1.55rem;
    font-weight: 300;
}
.logs-item ol {
    margin-left: 1em;
}
.logs-item ol li {
    padding: .625rem;
    color: #333;
    font-style: normal;
    line-height: 1.125rem;
    font-size: 1rem;
}
</style>