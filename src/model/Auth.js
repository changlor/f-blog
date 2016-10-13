'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
//引入配置文件
import Api from '../common/api.js';
import Data from '../common/data.js';
//User模型类
class Auth {
    //param [array] input --包括两个个参数
    //param [string] username --登录的用户名
    //param [string] password --登录的密码
    //return [string] res --登录成功与否，成功返回授权token
    static signin (input, callback) {
        //获取所需变量
        const [username, password] = [
            input.username,
            input.password,
        ];
        //如果username为空，返回不能为空
        if (Parent.empty(username)) {
            callback({ success: false, msg: '用户名不能为空OoO' });
            return false;
        }
        //如果password为空，返回不能为空
        if (Parent.empty(password)) {
            callback({ success: false, msg: '请输入密码OoO' });
            return false;
        }
        //获取接口信息
        const api = new Api({});
        //组装数据
        let user = new FormData();
        user.append('username', username);
        user.append('password', password);
        //发送数据
        Parent.post(api.signin, user, (res) => {
            //回调数据
            callback(res);
        });
    }
}

export default Auth;