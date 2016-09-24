const testHost = 'http://api.blog.rain/';
let host = location.host;
host = host.indexOf('localhost') != -1 ? testHost : `http://api.${host}/`;
console.log(host)
class blogFetchApi {
    static fetchData = (uri, callback) => {
        fetch(host + uri)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            callback(response);
        })
        .catch((error) => {
            console.error(error);
        });
    };
    static sendData = (uri, params, callback) => {
        fetch(host + uri, {
            method: 'POST',
            body: params,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            callback(response);
        })
        .catch((error) => {
            console.error(error);
        });
    };
    static sendImportantData = (uri, headers, params, callback) => {
        fetch(host + uri, {
            headers: headers,
            method: 'POST',
            body: params,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            callback(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

export default blogFetchApi;
