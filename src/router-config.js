'use strict';

export default function (router) {
    //路由路径
    router.map({
        '/': {
            component: require('./views/index.vue'),
        },
        '/daily': {
            component: require('./views/daily.vue'),
        },
        '/t/:tid': {
            name: 'topic',
            component: require('./views/viewTopic.vue'),
        },
        '/admin': {
            component: require('./views/admin.vue'),
        },
        '/new': {
            component: require('./views/new.vue'),
        },
        '/contribution': {
            component: require('./views/contribution.vue'),
        },
        //未匹配路由
        '*': {
            component: require('./views/notFound.vue'),
        },
    });
    
    //路由跳转
    router.redirect({
        //
    });

    //路由限制
    router.beforeEach((transition) => {
        if (transition.to.path === '/forbidden') {
            router.app.authenticating = true;
            setTimeout(() => {
                router.app.authenticating = false;
                alert('this route is forbidden by a global before hook');
                transition.abort();
            }, 3000);
        } else {
            transition.next();
        }
    });
}

