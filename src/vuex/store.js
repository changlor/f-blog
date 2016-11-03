import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    //定义钩子函数组件
    isTriggered: 0, hook: { subscriptions: [] },
    //定义代理事件数据
    isBubbled: 0, delegation: { events: [] },
    //定义缓存数据
    posts: {}, categories: {},
    //定义弹层数据
    msgbox: { contents: [], count: 0 },
    //定义遮罩数据
    shadow: { rightbar: false, global: false },
    //切换前后台
    admin: false,
};

const mutations = {
    //通用功能
    TRIGGER_HOOK (state, subscription) {
        state.isTriggered++;
        state.hook.subscriptions.push(subscription);
    },
    RESOLVE_HOOK_SUBSCRIPTIONS (state) {
        state.hook.subscriptions = [];
    },
    //事件代理
    BUBBLE_DELEGATION (state, subscription, input) {
        state.isBubbled++;
        state.delegation.events.push({
            subscription: subscription,
            input: input,
        });
    },
    RESOLVE_DELEGATION_EVENTS (state) {
        state.delegation.events = [];
    },
     //保存文章缓存信息内容
    CACHE_POST (state, post) {
        state.posts[`id-${post.id}`] = post;
    },
    //保存分类缓存信息内容
    CACHE_CATEGORY (state, category, info) {
        state.categories[category] = info;
    },
    //显示和关闭弹层
    CREATE_MSGBOX (state, content) {
        state.msgbox.count++;
        state.msgbox.contents.push({msg: content, isReaded: false});
    },
    READED_MSGBOX (state, status) {
        state.msgbox.contents = [];
    },
    //
    SWITCH_ADMIN_MODELS (state, status) {
        state.admin = status;
    },
    //显示和关闭遮罩
    UPDATE_SHADOW_ACTIVED_STATUS (state, component, status) {
        state.shadow[component] = status;
    },
    UPDATE_GLOBAL_SHADOW_STATUS (state, status) {
        state.shadow.global = status;
    }
};

//整合初始状态和变更函数，我们就得到了我们所需的 stroe
//至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
});
