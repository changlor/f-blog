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
    static resolveDelegationSubscriptions ({ dispatch }) {
        dispatch('RESOLVE_DELEGATION_SUBSCRIPTIONS');
    }
    //显示和关闭弹层
    static createMsgbox ({ dispatch }, content) {
        dispatch('CREATE_MSGBOX', content);
    }
    static readedMsgbox ({ dispatch }) {
        dispatch('READED_MSGBOX');
    }
    //
    static switchAdminModes ({ dispatch }, status) {
        dispatch('SWITCH_ADMIN_MODELS', status);
    }
};

export default blogCtrlApi;