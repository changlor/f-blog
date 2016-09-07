//这个 getter 函数会返回 count 的值
//在 ES6 里你可以写成：
//export const getCount = state => state.count
class blogDataApi {
    static getDailyInfo = state => state.daily;
    static getCurrentTopicKey = state =>state.currentKey;
};

export default blogDataApi;