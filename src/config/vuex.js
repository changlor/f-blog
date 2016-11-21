export default {
    getters: {
        getMsgboxCount: function (state) {
            return state.msgbox.count;
        },
        getMsgboxContents: function (state) {
            return state.msgbox.contents;
        },
        fetchCachedCategories: function (state) {
            return state.categories;
        },
        fetchCachedPosts: function (state) {
            return state.posts;
        },
        getAdminStatus: function (state) { 
            return state.admin;
        },
    },
    actions: {
        createMsgbox: function ({ dispatch }, content) {
            dispatch('CREATE_MSGBOX', content);
        },
        readedMsgbox: function ({ dispatch }) {
            dispatch('READED_MSGBOX');
        },
        signin: function ({ dispatch }) {
            dispatch('SWITCH_ADMIN_MODELS', true);
        },
        signout: function ({dispatch}) {
            dispatch('SWITCH_ADMIN_MODELS', false);
        }
    },
    store: {
        state: {
            msgbox: { contents: [], count: 0 },
            admin: false,
        },
        mutations: {
            CREATE_MSGBOX: function (state, content) {
                state.msgbox.count++;
                state.msgbox.contents.push({msg: content, isReaded: false});
            },
            READED_MSGBOX: function (state, status) {
                state.msgbox.contents = [];
            },
        }
    },
}