import Vue from 'vue';
import Vuex from 'vuex';

//告诉 vue "使用" vuex
Vue.use(Vuex);

//创建一个对象来保存应用启动时的初始状态
const state = {
    //定义缓存数据
    
    column: {
        daily: [],
    },
    article: [],
    cache: {
        column: {
            daily: false,
        },
        article: {},
    },
    currentKey: 0,
    msgBox: {
        createContent: '',
        createStatus: false,
    }
};

//创建一个对象储存一系列我们解析来要写的 mutation 函数

const mutations = {
    //mutation 的第一个参数是当前的 state
    //你可以在函数里修改 state
    UPDATE_COLUMN_CACHED_INFO (state, column, newInfo) {
        switch (column) {
            case 'daily':
                state.column.daily = newInfo;
            break;
            default:
                false;
            break;
        }
    },
    UPDATE_COLUMN_CACHED_STATUS (state, column, newStatus) {
        switch (column) {
            case 'daily':
                state.cache.column.daily = newStatus;
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
    SET_CURRENT_TOPIC_KEY (state, currentKey) {
        state.currentKey = currentKey
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
    CREATE_NEW_MSG_BOX (state, status, content) {
        state.msgBox.createStatus = status;
        state.msgBox.createContent = content;
    }
};

//整合初始状态和变更函数，我们就得到了我们所需的 stroe
//至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
});
