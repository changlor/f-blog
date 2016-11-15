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
    static signin (page) {
        //获取用户名
        const username = Func.trim(page.username);
        //如果用户名为空，打回
        if (Func.empty(username)) {
            console.log('用户名不能为空')
            return false;
        }
        //获取密码
        const password = Func.trim(page.password);
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
        //获取接口信息
        const api = new Api({});
        const uri = api.signin;
        //调用父模块post方法发送post数据
        Parent.post(uri, user, (res) => {
            //回调数据
            page.$nextTick(() => {
                page.$router.go('/feel');
            });
        });
    }
}

export default Auth;