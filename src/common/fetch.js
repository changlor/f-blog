class blogFetchApi {
    static fetchData = (url, callback) => {
        fetch(url)
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
};

export default blogFetchApi;
