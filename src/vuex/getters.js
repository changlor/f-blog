//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count
class blogDataApi {
    static fetchCachedColumnInfo = state => state.column;
    static fetchCachedColumnStatus = state => state.cache.column;
    static fetchCachedArticleInfo = state => state.article;
    static fetchCachedArticleStatus = state => state.cache.article;
    static getCurrentTopicKey = state =>state.currentKey;
};

export default blogDataApi;