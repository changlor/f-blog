//加载父模块
import Parent from '../lib/Fetch';
//加载依赖模块
import Data from './Data';
//定义常用变量
const setting = new Data({});
const host = setting.constants.host;
const token = setting.variables.token;

/*
 * @description: Fetch接口类，提供服务器通信操作的get，post，put接口
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Fetch {
    //post通信方法
    static post (uri, params, callback) {
        //将数据转换成formdata类型
        let formData = new FormData();
        for (let key in params) {
            formData.append(key, params[key]);
        }
        //添加header头信息
        let headers = new Headers();
        //post操作需要权限，因而需要在header添加token
        headers.append('Auth-Token', token);
        //调用父类方法发送post请求
        Parent.post(host + uri, headers, formData, callback);
    }
    //put通信方法
    static put (uri, params, callback) {
        //将数据转换成jsonData类型
        const jsonData = JSON.stringify(params);
        //添加header头信息
        let headers = new Headers();
        //put操作需要权限并且发送json数据，因而需要在header添加token和json头
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Auth-Token', token);
        //调用父类方法发送put请求
        Parent.put(host + uri, headers, params, callback);
    }
    //get通信方法
    static get (uri, version, callback) {
        //添加header头信息
        let headers = new Headers();
        //get操作可能需要发送版本号，因而正确的版本号将会被添加进header
        if (version.length == 40) {
            headers.append('Version', version);
        }
        //调用父类方法发送get请求
        Parent.get(host + uri, headers, callback);
    }
}

export default Fetch;
