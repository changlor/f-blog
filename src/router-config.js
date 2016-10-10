'use strict';
import localStorageApi from './common/store.js';

export default function (router) {
    //路由路径
    router.map({
        '/home': {
            component: require('./views/home.vue'),
        },
        '/daily': {
            component: require('./views/daily.vue'),
        },
        '/index': {
            component: require('./views/admin.vue'),
        },
        '/t/:tid': {
            name: 'topic',
            component: require('./views/viewTopic.vue'),
        },
        '/contribute': {
            component: require('./views/contribute.vue'),
        },
        '/new': {
            component: require('./views/new.vue'),
        },
        '/edit/:tid': {
            name: 'edit',
            component: require('./views/edit.vue'),
        },
        '/contribution': {
            component: require('./views/contribution.vue'),
        },
        '/ログイン': {
            component: require('./views/signin.vue'),
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
        switch (transition.to.path) {
            case '/unme':
                localStorageApi.fetchAuthor('changle') ? transition.redirect('/new') : transition.redirect('/contribute');
            break;
            case '/new':
                localStorageApi.fetchAuthor('changle') ? transition.next() : transition.redirect('/login');
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

