import Func from '../lib';
import setting from './config';
export default function (router, history) {
    const config = new setting({ history: history });
    //路由路径
    router.map(config.router);
    
    //路由跳转
    router.redirect({
        //
    });

    //路由限制
    router.beforeEach((transition) => {
        let userInfo = Func.read('userInfo');
        try {
            userInfo = JSON.parse(userInfo);
        } catch (e) {
            userInfo = {};
        }
        userInfo = userInfo || {};
        if (config.admin.hasOwnProperty(transition.to.path)) {
            userInfo.isLogin ? transition.next() : transition.redirect('/home');
        } else {
            !userInfo.isLogin ? transition.next() : transition.redirect('/index');
        }
    });

    router.afterEach((transition) => {
        scroll(0, 0);
    });
}