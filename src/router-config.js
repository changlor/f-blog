'use strict';
import getLocalStorageApi from './store.js';

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
        '/contribute': {
            component: require('./views/contribute.vue'),
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
        switch (transition.to.path) {
            case '/unme':
                getLocalStorageApi.fetchAuth() ? transition.redirect('/new') : transition.redirect('/contribute');
            break;
            case '/new':
                getLocalStorageApi.fetchAuth() ? transition.next() : transition.redirect('/contribute');
            break;
            default:
                transition.next();
            break;
        }
    });
}

