import Vue from "vue";
import Vuex from "vuex";

import { state, actions, getters, mutations } from "./config";

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
