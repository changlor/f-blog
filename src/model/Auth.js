'use strict';

import base from './Base.js';
import Api from '../common/api.js';

const Parent = new base();

class User {
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
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        //发送数据
        Parent.post(api.signin, formData, callback);
    }
}

export default User;