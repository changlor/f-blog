//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count
class blogDataApi {
    static getMsgboxCount = state => state.msgbox.count;
    static getMsgboxCreateContents = state => state.msgbox.contents;
    static getShadowRightbarActivedStatus = state => state.shadow.rightbar;
    static getShadowGlobalActivedStatus = state => state.shadow.global;
    static getAdminStatus = state => state.admin;
    //
    static readEvents = state => state.events;
    static getEventListener = state => state.isBubbled;
    //
    static fetchCachedCategories = state => state.categories;
    static fetchCachedPosts = state => state.posts;
}

export default blogDataApi;