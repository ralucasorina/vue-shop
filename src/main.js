import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import 'bootstrap';
import JQuery from 'jquery';
window.$ = JQuery;
import 'popper.js';
import './assets/app.scss';
import {fb}   from './firebase'
import VueFirestore from 'vue-firestore'

require('firebase/firestore')
Vue.use(VueFirestore, {
  key: 'id',
  enumerable: true
})

Vue.use(VueFirestore)


import Swal from 'sweetalert2';
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});
window.Toast = Toast;
Vue.component('navBar', require('./components/navBar.vue').default);



Vue.config.productionTip = false;

// make sure to set this synchronously immediately after loading Vue
Vue.config.devtools = true;

let app='';

fb.auth().onAuthStateChanged(function(user) {

  if(!app) {
      new Vue({
        router,
        render: h => h(App)
      }).$mount("#app");

  }
   
});
