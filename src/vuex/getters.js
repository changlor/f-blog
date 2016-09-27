//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count
class blogDataApi {
    static fetchCachedCategoryInfo = state => state.category;
    static fetchCachedCategoryStatus = state => state.cache.category;
    static fetchCachedArticleInfo = state => state.article;
    static fetchCachedArticleStatus = state => state.cache.article;
    static getCurrentTopicKey = state => state.currentKey;
    static getMsgboxCount = state => state.msgbox.createCount;
    static getMsgboxCreateContents = state => state.msgbox.createContents;
    static getShadowRightbarActivedStatus = state => state.shadow.rightbar;
    static getAdminStatus= state => state.admin;
}

export default blogDataApi;