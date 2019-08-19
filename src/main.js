import Vue from 'vue';
import App from './App.vue';
import router from './route';
import store from './store';
import './plugins';
import Datetime from 'vue-datetime';
import VueTruncate from 'vue-truncate-filter';
import moment, {unix} from 'moment';
import VModal from 'vue-js-modal';

import './assets/main.scss';

Vue.use(VueTruncate);
Vue.use(Datetime);
Vue.use(VModal);

Vue.filter('formatDateTime', function(value) {
  if (value) {
    return moment(unix(value)).format('MM-DD-YYYY HH:mm')
  }
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(unix(value)).format('MM-DD-YYYY')
  }
});

Vue.filter('formatTime', function(value) {
  if (value) {
    return moment(unix(value)).format("HH:mm")
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
