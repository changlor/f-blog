class blogCtrlApi {
    //事件代理
    static eventDelegation ({ dispatch }, event) {
        dispatch('EVENT_DELEGATION', event);
    }
    static readedEvents ({ dispatch }) {
        dispatch('READED_EVENTS');
    }
    static handledEvent ({ dispatch }, component, id) {
        dispatch('HANDLED_EVENT', component, id);
    }
    //保存分类缓存信息内容
    static cacheCategory ({ dispatch }, category, info) {
        dispatch('CACHE_CATEGORY', category, info);
    }
    //保存文章缓存信息内容
    static cachePost ({ dispatch }, post) {
        dispatch('CACHE_POST', post);
    }
    //显示和关闭弹层
    static createNewMsgbox ({ dispatch }, content) {
        dispatch('CREATE_NEW_MSGBOX', content);
    }
    static readMsgbox ({ dispatch }, status) {
        dispatch('READ_MSGBOX', status);
    }
    //显示和关闭遮罩
    static updateShadowActivedStatus ({ dispatch }, component, status) {
        dispatch('UPDATE_SHADOW_ACTIVED_STATUS', component, status);
    }
    static updateAdminStatus ({ dispatch }, status) {
        dispatch('UPDATE_ADMIN_STATUS', status);
    }
    static updateGlobalShadowStatus ({ dispatch }, status) {
        dispatch('UPDATE_GLOBAL_SHADOW_STATUS', status);
    }
};

export default blogCtrlApi;