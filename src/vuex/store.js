import Vue from 'vue';
import Vuex from 'vuex';

//告诉 vue "使用" vuex
Vue.use(Vuex);

//创建一个对象来保存应用启动时的初始状态
const state = {
    //定义缓存数据
    daily: [
        {
            title: '三生石',
            tid: 1,
            created_at: '5月25日',
            cover: 'http://ww2.sinaimg.cn/mw1024/a15b4afegw1ex5mdn0b5yj21kw1kwqv5',
            profile: '<p><code>templet.js</code> 是一个简单的 JavaScript 前端引擎。</p><h2>现已支持</h2><p>变量、子属性、变量判断、运算判断、数组循环、对象循环、管道。 <br>编译过的模板可复用。</p><p class="more"><a href="#!54118">- 查看更多 -</a></p>',
            text: '<p><code>templet.js</code> 是一个简单的 JavaScript 前端引擎。</p><h2>现已支持</h2><p>变量、子属性、变量判断、运算判断、数组循环、对象循环、管道。 <br>编译过的模板可复用。</p><h2>文档</h2><p>并没有文档，请对照 <code>simple.html</code> 演示。</p><h2>演示</h2><p><a href="http://front.dog/templet/" target="_blank">http://front.dog/templet/</a></p><h2>GitHub</h2><p><a href="https://github.com/itorr/templet">https://github.com/itorr/templet</a></p>',
        },
    ],
    currentKey: 0,
};

//创建一个对象储存一系列我们解析来要写的 mutation 函数

const mutations = {
    //mutation 的第一个参数是当前的 state
    //你可以在函数里修改 state
    DAILY_INFO (state, newInfo) {
        state.daily = newInfo;
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
    }
};

//整合初始状态和变更函数，我们就得到了我们所需的 stroe
//至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
    state,
    mutations,
});
