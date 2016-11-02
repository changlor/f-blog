class blogCtrlApi {
    //通用功能函数
    static triggerHook ({ dispatch }, subscription) {
        dispatch('TRIGGER_HOOK', subscription);
    }
    static resolveHookSubscriptions ({dispatch}) {
        dispatch('RESOLVE_HOOK_SUBSCRIPTIONS');
    }
    //事件代理
    static bubbleDelegation ({ dispatch }, subscription, input) {
        dispatch('BUBBLE_DELEGATION', subscription, input);
    }
    static resolveDelegationEvents ({ dispatch }) {
        dispatch('RESOLVE_DELEGATION_EVENTS');
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
    static createMsgbox ({ dispatch }, content) {
        dispatch('CREATE_MSGBOX', content);
    }
    static readedMsgbox ({ dispatch }) {
        dispatch('READED_MSGBOX');
    }
    //显示和关闭遮罩
    static updateShadowActivedStatus ({ dispatch }, component, status) {
        dispatch('UPDATE_SHADOW_ACTIVED_STATUS', component, status);
    }
    static updateGlobalShadowStatus ({ dispatch }, status) {
        dispatch('UPDATE_GLOBAL_SHADOW_STATUS', status);
    }
    //
    static switchAdminModes ({ dispatch }, status) {
        dispatch('SWITCH_ADMIN_MODELS', status);
    }
};

export default blogCtrlApi;