import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
//使用iview的LoadingBar
import {LoadingBar} from 'view-design';

Vue.component('LoadingBar', LoadingBar);
//配置
router.beforeEach((to, from, next) => {
    LoadingBar.start();
    next();
});
router.afterEach(() => {
    LoadingBar.finish();
});

moment.locale('zh-cn');
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(ViewUI);

new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app');
