import { Xhr } from '../vendor/lib'

class Parent {
    static get (url, options) {
        return Xhr.fetch(url, options);
    }
}

export default Parent;