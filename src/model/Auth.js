'use strict';
//伪继承基类
import Base from './Base.js';
const Parent = new Base();
//引入配置文件
import Api from '../common/api.js';
import Data from '../common/data.js';
//User模型类
class Auth {
    static signin (input, callback) {
        const [username, password] = [input.username, input.password];
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
        Parent.post(api.signin, user, callback);
    }
}

export default Auth;