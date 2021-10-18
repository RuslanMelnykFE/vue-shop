const preloader = {
  namespaced: true,

  state: {
    isShowPreloader: true,
  },

  getters: {
    isShowPreloader: (state) => state.isShowPreloader,
  },

  mutations: {
    updateIsShowPreloader(state, value) {
      state.isShowPreloader = value;
    },
  },

  actions: {
    togglePreloader(context, value) {
      const { commit } = context;

      commit('updateIsShowPreloader', value);
    },
  },
};

export default preloader;
