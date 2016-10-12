//fetch库类
class Fetch {
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

    static get (url, headers, callback) {
        Fetch.fetch(url, {
            method: 'GET',
            headers: headers,
        }, callback, (error) => {
            console.log(error);
        });
    }

    static post (url, headers, params, callback) {
        Fetch.fetch(url, {
            method: 'POST',
            headers: headers,
            body: params,
        }, callback, (error) => {
            console.log(error);
        });
    }

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

