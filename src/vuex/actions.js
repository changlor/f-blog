//action 会收到 store 作为它的第一个参数
//既然我们只对事件的分发(dispatch 对象)感兴趣。（state 也可以作为可选项放入）
//我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
class blogCtrlApi {
  static updateDailyInfo ({ dispatch }, newInfo ) {
    dispatch('DAILY_INFO', newInfo);
  }
  static setCurrentTopicCacheKey ({ dispatch }, currentKey ) {
    dispatch('SET_CURRENT_TOPIC_KEY', currentKey);
  }
  static addNewTopic ({ dispatch }, title, content ) {
    dispatch('ADD_NEW_TOPIC', title, content);
  }
};

export default blogCtrlApi;