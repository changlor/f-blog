/*
 * @description: Store接口基类，提供对localstorage操作的底层接口
 * @author: Changle
 * @update: Changle (2016-10-21 15:32)
 */
class Session {
    static session (key, value = '') {
        if (value = '') {
            return window.sessionStorage.getItem(key);
        } else {
            window.sessionStorage.setItem(key, value);
        }
    }
}

export default Session;

