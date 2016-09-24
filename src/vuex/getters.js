//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count
class blogDataApi {
    static fetchCachedCategoryInfo = state => state.category;
    static fetchCachedCategoryStatus = state => state.cache.category;
    static fetchCachedArticleInfo = state => state.article;
    static fetchCachedArticleStatus = state => state.cache.article;
    static getCurrentTopicKey = state => state.currentKey;
    static getMsgBoxCreateStatus = state => state.msgBox.createStatus;
    static getMsgBoxCreateContent = state => state.msgBox.createContent;
}

export default blogDataApi;