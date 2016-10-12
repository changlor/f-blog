'use strict';
import store from './common/store.js';

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
        switch (transition.to.path) {
            case '/unme':
                store.read('changle') ? transition.redirect('/new') : transition.redirect('/contribute');
            break;
            case '/new':
                store.read('changle') ? transition.next() : transition.redirect('/login');
            break;
            default:
                transition.next();
            break;
        }
    });

    router.afterEach((transition) => {
        scroll(0,0);
    });
}

