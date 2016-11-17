export default {
    getters: {
        getMsgboxCount: function (state) {
            return state.msgbox.count
        },
        getMsgboxContents: function (state) {
            return state.msgbox.contents
        },
        fetchCachedCategories: function (state) {
            return state.categories
        },
        fetchCachedPosts: function (state) {
            return state.posts
        },
    },
    actions: {
        createMsgbox: function ({ dispatch }, content) {
            dispatch('CREATE_MSGBOX', content)
        },
        readedMsgbox: function ({ dispatch }) {
            dispatch('READED_MSGBOX')
        },
    },
    store: {
        state: {
            msgbox: { contents: [], count: 0 },
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