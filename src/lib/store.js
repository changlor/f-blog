class storeApi {
    static storeJson (key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    static readJson (key) {
        try {
            return JSON.parse(window.localStorage.getItem(key));
        } catch (e) {
            return null;
        }
    }

    static storeData (key, value) {
        window.localStorage.setItem(key, value);
    }

    static readData (key) {
        return window.localStorage.getItem(key);
    }
}

export default storeApi;

