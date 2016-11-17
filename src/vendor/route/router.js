import Func from '../lib';
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
        if (config.admin.hasOwnProperty(transition.to.path)) {
            let userInfo = Func.read('userInfo');
            try {
                userInfo = JSON.parse(userInfo);
            } catch (e) {
                userInfo = {};
            }
            userInfo.isLogin ? transition.next() : transition.redirect('/home');
        } else {
            transition.next();
        }
    });

    router.afterEach((transition) => {
        scroll(0, 0);
    });
}