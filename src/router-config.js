'use strict';

export default function (router) {
    //路由路径
    router.map({
        '/home': {
            component: require('./views/categories/home.vue'),
        },
        '/daily': {
            component: require('./views/categories/daily.vue'),
        },
        '/index': {
            component: require('./views/admin/index.vue'),
        },
        '/t/:tid': {
            name: 'topic',
            component: require('./views/post/post.vue'),
        },
        '/contribute': {
            component: require('./views/contribute.vue'),
        },
        '/new': {
            component: require('./views/admin/new.vue'),
        },
        '/edit/:tid': {
            name: 'edit',
            component: require('./views/admin/edit.vue'),
        },
        '/contribution': {
            component: require('./views/contribution.vue'),
        },
        '/ログイン': {
            component: require('./views/admin/signin.vue'),
        },
        //未匹配路由
        '*': {
            component: require('./views/error/notFound.vue'),
        },
    });
    
    //路由跳转
    router.redirect({
        //
    });

    //路由限制
    router.beforeEach((transition) => {
        //
    });

    router.afterEach((transition) => {
        scroll(0, 0);
    });
}

