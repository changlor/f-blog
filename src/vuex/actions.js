//action 会收到 store 作为它的第一个参数
//既然我们只对事件的分发(dispatch 对象)感兴趣。（state 也可以作为可选项放入）
//我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
class blogCtrlApi {
  static updateColumnCachedInfo ({ dispatch }, column, newInfo) {
    dispatch('UPDATE_COLUMN_CACHED_INFO', column, newInfo);
  }
  static updateColumnCachedStatus ({ dispatch }, column, newStatus) {
    dispatch('UPDATE_COLUMN_CACHED_STATUS', column, newStatus);
  }
  static updateArticleCachedInfo ({ dispatch }, newInfo) {
    dispatch('UPDATE_ARTICLE_CACHED_INFO', newInfo);
  }
  static updateArticleCachedStatus ({ dispatch }, articleId, articleIndex) {
    dispatch('UPDATE_ARTICLE_CACHED_STATUS', articleId, articleIndex);
  }
  static setCurrentTopicCacheKey ({ dispatch }, currentKey ) {
    dispatch('SET_CURRENT_TOPIC_KEY', currentKey);
  }
  static addNewTopic ({ dispatch }, title, content ) {
    dispatch('ADD_NEW_TOPIC', title, content);
  }
};

export default blogCtrlApi;