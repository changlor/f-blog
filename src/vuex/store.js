import Vue from 'vue';
import Vuex from 'vuex';

//告诉 vue "使用" vuex
Vue.use(Vuex);

//创建一个对象来保存应用启动时的初始状态
const state = {
    //定义缓存数据
    
    category: {
        daily: [],
    },
    article: [],
    cache: {
        category: {
            daily: false,
        },
        article: {},
    },
    msgbox: {
        createContents: [],
        createCount: 0,
    },
    shadow: {
        rightbar: false,
    },
    admin: false,
};

//创建一个对象储存一系列我们解析来要写的 mutation 函数

const mutations = {
    //mutation 的第一个参数是当前的 state
    //你可以在函数里修改 state
    UPDATE_CATEGORY_CACHED_INFO (state, category, newInfo) {
        switch (category) {
            case 'daily':
                state.category.daily = newInfo;
            break;
            default:
                false;
            break;
        }
    },
    UPDATE_CATEGORY_CACHED_STATUS (state, category, newStatus) {
        switch (category) {
            case 'daily':
                state.cache.category.daily = newStatus;
            break;
            default:
                false;
            break;
        }
    },
    UPDATE_ARTICLE_CACHED_INFO (state, newInfo) {
        state.article.push(newInfo);
    },
    UPDATE_ARTICLE_CACHED_STATUS (state, articleId, articleIndex) {
        state.cache.article[`id${articleId}`] = articleIndex;
    },
    ADD_NEW_TOPIC (state, title, content) {
        const newTopic = {
            title: title,
            tid: 3,
            created_at: '5月26日',
            profile: content,
        }
        state.daily.push(newTopic);
    },
    CREATE_NEW_MSGBOX (state, content) {
        state.msgbox.createCount++;
        state.msgbox.createContents.push({msg: content, isRead: false});
    },
    READ_MSGBOX (state, status) {
        state.msgbox.createContents = [];
    },
    UPDATE_SHADOW_ACTIVED_STATUS (state, component, status) {
        state.shadow[component] = status;
    },
    UPDATE_ADMIN_STATUS (state, status) {
        state.admin = status;
    }
};

//整合初始状态和变更函数，我们就得到了我们所需的 stroe
//至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
});
