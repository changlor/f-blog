//加载依赖模块
import { Func, Xhr, Store, Php, Session } from '../vendor/lib';
import Api from '../config/Api';

/*
 * @description: Base模型类，提供对子类的各种底层操作方法接口
 * @author: Changle
 * @update: Changle (2016-10-20 20:32)
 */
class Base {
    //初始化各种子类需要的方法函数
    fetch (url, method, params) {
        const userInfo = Func.readUserInfo();
        this.token = userInfo.token;
        const options = {};
        if (method == 'get') {
            let query = Php.http_build_query(params);
            url = Php.empty(query) ? url : `${url}?${query}`;
        }
        if (method != 'get') {
            //将数据转换成json类型
            const jsonData = JSON.stringify(params);
            //添加header头信息
            let headers = new Headers();
            //post操作需要权限，因而需要在header添加token
            headers.append('Auth-Token', this.token);
            //发射json数据需要添加json头信息
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');
            options.body = jsonData;
            options.headers = headers;
        }
        options.method = method;
        return Xhr.fetch(url, options);
    }
}

const Parent = new Base();

export { Parent, Func, Php, Store, Session, Api };