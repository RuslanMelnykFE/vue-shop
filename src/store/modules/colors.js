import { ColorsError, ColorsService } from '@/services/colors.service';

const colors = {
  namespaced: true,

  state: {
    colorsData: [],
    colorsError: {},
  },

  getters: {
    colorsData: (state) => state.colorsData,
    colorsError: (state) => state.colorsError,
  },

  mutations: {
    updateColorsData(state, colorsData) {
      state.colorsData = colorsData;
    },
    updateColorsError(state, colorsError) {
      state.colorsError = colorsError;
    },
  },

  actions: {
    async loadColorsData({ commit }) {
      commit('updateColorsError', {});

      try {
        const { items } = await ColorsService.getColors();

        commit('updateColorsData', items);

        return true;
      } catch (e) {
        if (e instanceof ColorsError) {
          commit('updateColorsError', {
            errorCode: e.errorCode,
            errorMessage: e.errorMessage,
          });
        }

        return false;
      }
    },
  },
};

export default colors;
