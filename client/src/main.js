import Vue from 'vue';
import App from './App.vue';
import API from './utils/api';
import Store from './utils/store';
import './assets/styles/app.scss';
import moment from 'moment';

Vue.config.productionTip = false;
Vue.prototype.$api = API;
Vue.prototype.$store = Store;

var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

Vue.filter('secondsDuration', function (value) {
  return moment.duration(value, "seconds").format("mm:ss", { trim: false }) + 'min';
});

new Vue({
  render: h => h(App),
}).$mount('#le-trax')
