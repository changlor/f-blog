import sha1 from './encrypt/sha1';

const createVersion = function (code) {
    code = escape(code).replace(/%u/gi, '\\u');
    code = unescape(code);
    return sha1(code);
};

export default {
    createVersion: createVersion,
};