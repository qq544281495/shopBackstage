'use strict';
import axios from 'axios';
import request from 'framework/network/request';
import moment from 'moment'

export default {
  install(Vue) {
    axios.defaults.baseURL = 'http://127.0.0.1:7002';
    Vue.prototype.$request = request;
    Vue.prototype.$axios = axios;
    Vue.prototype.moment = moment;
  }
};