//action 会收到 store 作为它的第一个参数
//既然我们只对事件的分发(dispatch 对象)感兴趣。（state 也可以作为可选项放入）
//我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
class blogCtrlApi {
  static updateCategoryCachedInfo ({ dispatch }, category, newInfo) {
    dispatch('UPDATE_CATEGORY_CACHED_INFO', category, newInfo);
  }
  static updateCategoryCachedStatus ({ dispatch }, category, newStatus) {
    dispatch('UPDATE_CATEGORY_CACHED_STATUS', category, newStatus);
  }
  static updateArticleCachedInfo ({ dispatch }, newInfo) {
    dispatch('UPDATE_ARTICLE_CACHED_INFO', newInfo);
  }
  static updateArticleCachedStatus ({ dispatch }, articleId, articleIndex) {
    dispatch('UPDATE_ARTICLE_CACHED_STATUS', articleId, articleIndex);
  }
  static addNewTopic ({ dispatch }, title, content) {
    dispatch('ADD_NEW_TOPIC', title, content);
  }
  static createNewMsgbox ({ dispatch }, status, content) {
    dispatch('CREATE_NEW_MSGBOX', status, content);
  }
  static readMsgbox ({ dispatch }, status) {
    dispatch('READ_MSGBOX', status);
  }
  static updateShadowActivedStatus ({ dispatch }, component, status) {
    dispatch('UPDATE_SHADOW_ACTIVED_STATUS', component, status);
  }
};

export default blogCtrlApi;