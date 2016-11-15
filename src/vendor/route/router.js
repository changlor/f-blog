import config from './config';

export default function (router) {
    //路由路径
    router.map(config.router);
    
    //路由跳转
    router.redirect({
        //
    });

    //路由限制
    router.beforeEach((transition) => {
        transition.next();
    });

    router.afterEach((transition) => {
        scroll(0, 0);
    });
}