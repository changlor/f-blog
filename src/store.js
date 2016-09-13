class localStorageApi {
    static savedAuthor (username) {
        window.localStorage.setItem(username, true);
    }
    
    static savedToken (value) {
        window.localStorage.setItem('token', value)
    }

    static expiredAuthor (username) {
        window.localStorage.setItem(username, false);
    }
    
    static fetchAuthor (username) {
        return window.localStorage.getItem(username);
    }

    static fetchToken () {
        return window.localStorage.getItem('token');
    }
}

export default localStorageApi;