import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap';
import JQuery from 'jquery';
window.$ = JQuery;
import 'popper.js';
import './assets/app.scss';

Vue.component('navBar', require('./components/navBar.vue').default);



Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
