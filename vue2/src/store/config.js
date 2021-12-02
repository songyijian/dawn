/*
 * @Description: Store config
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 16:44:56
 */

const state = {
  ajaxLoading: false,
};

const actions = {};

const getters = {};

const mutations = {
  setAjaxLoading(state, flag) {
    state.ajaxLoading = flag;
  },
};

export { state, actions, getters, mutations };
