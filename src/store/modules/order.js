import { OrderError, OrderService } from '@/services/order.service';

const saveError = ({ commit, e }) => {
  if (e instanceof OrderError) {
    commit('updateOrderDataError', {
      errorCode: e.errorCode,
      errorMessage: e.message,
    });
  }
};

const order = {
  namespaced: true,

  state: {
    orderData: {},
    orderDataError: {},
    orderStatus: null,
  },

  getters: {
    userAccessKey: (state, getters, rootState) => rootState.cart.userAccessKey,
    orderData: (state) => state.orderData,
    orderDataError: (state) => state.orderDataError,
    orderStatus: (state) => state.orderStatus,
  },

  mutations: {
    updateOrderData(state, orderData) {
      state.orderData = orderData;
    },
    updateOrderDataError(state, errorData) {
      state.orderDataError = errorData;
    },
    updateOrderStatus(state, statusValue) {
      state.orderStatus = statusValue;
    },
  },

  actions: {
    async orderProducts(context, orderData) {
      const { getters, commit, dispatch } = context;

      commit('updateOrderDataError', {});
      commit('updateOrderStatus', null);
      dispatch('preloader/togglePreloader', true, { root: true });

      try {
        const { userAccessKey } = getters;
        const { status, data } = await OrderService.orderProudcts(userAccessKey, orderData);

        commit('updateOrderData', data);
        commit('updateOrderStatus', status);
        dispatch('cart/resetCart', null, { root: true });

        return true;
      } catch (e) {
        saveError({ commit, e });
        return false;
      } finally {
        dispatch('preloader/togglePreloader', false, { root: true });
      }
    },

    async getOrderProduct(context, orderId) {
      const { getters, commit, dispatch } = context;

      commit('updateOrderDataError', {});
      dispatch('preloader/togglePreloader', true, { root: true });

      try {
        const { userAccessKey } = getters;
        const data = await OrderService.getOrderProduct(userAccessKey, orderId);

        commit('updateOrderData', data);

        return true;
      } catch (e) {
        saveError({ commit, e });
        return false;
      } finally {
        dispatch('preloader/togglePreloader', false, { root: true });
      }
    },
  },
};

export default order;
