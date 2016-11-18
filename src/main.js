import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerConfig } from './vendor/route';

//装载vue-router
Vue.use(VueRouter);

//实例化vue-router
const history = false;
let router = new VueRouter({
    history: history,
    saveScrollPosition: true,
});

let app = Vue.extend(require('./vendor/components/App.vue'));
routerConfig(router, history);

router.start(app, '#app');
