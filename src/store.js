const STORAGE_KEY = 'onesan-daisuki';
export default {
    fetchAuth () {
        return window.localStorage.getItem(STORAGE_KEY) || '';
    },
    savedAuth (items) {
        window.localStorage.setItem(STORAGE_KEY, items);
    },
}
