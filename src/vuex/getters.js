//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count
class blogDataApi {
    //
    static getMsgboxCount = state => state.msgbox.count;
    static getMsgboxContents = state => state.msgbox.contents;
    //
    static getShadowRightbarActivedStatus = state => state.shadow.rightbar;
    static getShadowGlobalActivedStatus = state => state.shadow.global;
    //
    static getAdminStatus = state => state.admin;
    //
    static fetchCachedCategories = state => state.categories;
    static fetchCachedPosts = state => state.posts;
    //
    static getDelegationListener = state => state.isBubbled;
    static getDelegationEvents = state => state.delegation.events;
    //
    static getHookListener = state => state.isTriggered;
    static getHookSubscriptions = state => state.hook.subscriptions;
}

export default blogDataApi;