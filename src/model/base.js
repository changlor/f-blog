//加载依赖模块
import { Func } from '../vendor';
import Api from '../config/Api';

/*
 * @description: Base模型类，提供对子类的各种底层操作方法接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Base {
    //初始化各种子类需要的方法函数
    constructor() {
        //通信函数
        const userInfo = Func.readUserInfo();
        this.token = userInfo.token;
    }
    //post通信方法
    post (url, params, callback) {
        //将数据转换成json类型
        const jsonData = JSON.stringify(params);
        //添加header头信息
        let headers = new Headers();
        //post操作需要权限，因而需要在header添加token
        headers.append('Auth-Token', this.token);
        //发射json数据需要添加json头信息
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        //调用父类方法发送post请求
        Func.post(url, headers, jsonData, callback);
    }
    //put通信方法
    put (url, params, callback) {
        //将数据转换成jsonData类型
        const jsonData = JSON.stringify(params);
        //添加header头信息
        let headers = new Headers();
        //put操作需要权限并且发送json数据，因而需要在header添加token和json头
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Auth-Token', this.token);
        //调用父类方法发送put请求
        Func.put(url, headers, params, callback);
    }
    //get通信方法
    get (url, params, callback) {
        //添加header头信息
        let headers = new Headers();
        //get操作可能需要携带一些请求参数，拼装之
        let request = '?';
        for (let key in params) {
            if (key == 'version' && params[key].length == 40) {
                headers.append('Version', params.version);
            }
            //不携带undefined的参数，以防止前后端默认参数不相同的情况发生
            if (typeof params[key] != 'undefined' && typeof params == 'object') {
                request = `${request}&${key}=${params[key]}`;
            }
        }
        //如果没有携带任何get请求参数或者参数不是合法类型，则将请求设为空
        if (request == '?') {
            request = '';
        }
        //调用父类方法发送get请求
        Func.get(url + request, headers, callback);
    }
}

const Parent = new Base();

export { Parent, Func, Api };