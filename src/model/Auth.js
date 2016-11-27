//加载父模块
import { Parent, Func, Php, Store, Api } from './Base';

class Auth {
    static signin (page, component) {
        //获取接口信息
        const api = new Api({});
        const uri = api.signin;
        //获取用户信息
        const userInfo = Func.readUserInfo();
        //如果存在token，则请求验证
        if (userInfo.isLogin || userInfo.token.length == 40) {
            Parent.fetch(uri, 'post').then((res) => {
                //回调数据
                if (res.success) {
                    component.siginin();
                    userInfo.username = res.data.username;
                    userInfo.isLogin = true;
                    Store.set('userInfo', JSON.stringify(userInfo));
                    page.$nextTick(() => {
                        page.$router.go('/write');
                    });
                } else {
                    component.signout();
                    userInfo.isLogin = false;
                    userInfo.token = '';
                    Store.set('userInfo', JSON.stringify(userInfo));
                }
            });
            return false;
        }
        //获取用户名
        const username = typeof page.username == 'string' ? page.username.trim() : '';
        //如果用户名为空，打回
        if (Php.empty(username)) {
            console.log('用户名不能为空')
            return false;
        }
        //获取密码
        const password = typeof page.password == 'string' ? page.password.trim() : '';
        //如果密码为空，打回
        if (Php.empty(password)) {
            console.log('密码不能为空')
            return false;
        }
        //组装数据
        let user = {
            username: username,
            password: password,
        };
        //调用父模块post方法发送post数据
        Parent.fetch(uri, 'post', user).then((res) => {
            //回调数据
            if (res.success) {
                component.signin();
                userInfo.token = res.data.token;
                userInfo.isLogin = true;
                Store.set('userInfo', JSON.stringify(userInfo));
                page.$nextTick(() => {
                    page.$router.go('/write');
                });
            }
        });
    }

    static signout (page, component) {
        const userInfo = Func.readUserInfo();
        userInfo.isLogin = false;
        Store.set('userInfo', JSON.stringify(userInfo));
        component.signout();
        page.$nextTick(() => {
            page.$router.go('/home');
        });
    }
}

export default Auth;