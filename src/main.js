import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap';
import JQuery from 'jquery';
window.$ = JQuery;
import 'popper.js';
import './assets/app.scss';
import {fb}   from './firebase'

Vue.component('navBar', require('./components/navBar.vue').default);



Vue.config.productionTip = false;

let app='';

fb.auth().onAuthStateChanged(function(user) {

  if(!app) {
      new Vue({
        router,
        render: h => h(App)
      }).$mount("#app");

  }
   
});
