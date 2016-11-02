//加载父模块
import Base from './Base';
const Parent = new Base();
//加载依赖模块

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
    static signin (input, callback) {
        //获取所需变量
        const [username, password] = [
            input.username,
            input.password,
        ];
        //如果username为空，返回不能为空
        if (Parent.empty(username)) {
            callback(Parent.response([false, '用户名不能为空OoO']))
            return false;
        }
        //如果password为空，返回不能为空
        if (Parent.empty(password)) {
            callback(Parent.response([false, '请输入密码OoO']))
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
            callback(res);
        });
    }
}

export default Auth;