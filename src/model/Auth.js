//加载父模块
import { Parent, Func, Api } from './Base';

/*
 * @description: Auth模型类，提供对用户获取授权操作的接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Auth {
    /*
     * @description: 登录并获得授权token
     * @param [array] input --包括两个个参数
     * @param [string] username --登录的用户名
     * @param [string] password --登录的密码
     * @return [string] --登录成功返回授权token
     */
    static signin (page, component) {
        //获取接口信息
        const api = new Api({});
        const uri = api.signin;
        //获取用户信息
        let userInfo = Func.read('userInfo');
        try {
            userInfo = JSON.parse(userInfo);
        } catch (e) {
            userInfo = {};
        }
        userInfo = userInfo || {};
        userInfo.token = userInfo.token || '';
        //如果存在token，则请求验证
        if (userInfo.isLogin || userInfo.token.length == 40) {
            Parent.post(uri, '', (res) => {
                //回调数据
                if (res.success) {
                    component.signin();
                    userInfo.username = res.data.username;
                    userInfo.isLogin = true;
                    Func.store('userInfo', JSON.stringify(userInfo));
                    page.$nextTick(() => {
                        page.$router.go('/write');
                    });
                } else {
                    component.signout();
                    userInfo.isLogin = false;
                    userInfo.token = '';
                    Func.store('userInfo', JSON.stringify(userInfo));
                }
            });
            return false;
        }
        //获取用户名
        const username = !Func.empty(username) ? Func.trim(page.username) : page.username;
        //如果用户名为空，打回
        if (Func.empty(username)) {
            console.log('用户名不能为空')
            return false;
        }
        //获取密码
        const password = !Func.empty(password) ? Func.trim(page.password) : page.password;
        //如果密码为空，打回
        if (Func.empty(password)) {
            console.log('密码不能为空')
            return false;
        }
        //组装数据
        let user = {
            username: username,
            password: password,
        };
        //调用父模块post方法发送post数据
        Parent.post(uri, user, (res) => {
            //回调数据
            if (res.success) {
                component.signin();
                userInfo.token = res.data.token;
                userInfo.isLogin = true;
                Func.store('userInfo', JSON.stringify(userInfo));
                page.$nextTick(() => {
                    page.$router.go('/write');
                });
            }
        });
    }

    static signout (page, component) {
        let userInfo = Func.read('userInfo');
        try {
            userInfo = JSON.parse(userInfo);
        } catch (e) {
            userInfo = {};
        }
        userInfo.isLogin = false;
        Func.store('userInfo', JSON.stringify(userInfo));
        component.signout();
        page.$nextTick(() => {
            page.$router.go('/home');
        });
    }
}

export default Auth;