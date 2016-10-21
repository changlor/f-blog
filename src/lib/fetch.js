/*
 * @description: Fetch接口基类，提供服务器通信操作的底层接口
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Fetch {
    //对fetch的简单封装
    static fetch (input, init, fulfilled, rejected) {
        fetch(input, init)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            fulfilled(response);
        })
        .catch((error) => {
            rejected(error);
        });
    }
    //get通信方法
    static get (url, headers, callback) {
        Fetch.fetch(url, {
            method: 'GET',
            headers: headers,
        }, callback, (error) => {
            console.log(error);
        });
    }
    //post通信方法
    static post (url, headers, params, callback) {
        Fetch.fetch(url, {
            method: 'POST',
            headers: headers,
            body: params,
        }, callback, (error) => {
            console.log(error);
        });
    }
    //put通信方法
    static put (url, headers, params, callback) {
        Fetch.fetch(url, {
            method: 'PUT',
            headers: headers,
            body: params,
        }, callback, (error) => {
            console.log(error);
        });
    }
}

export default Fetch;

