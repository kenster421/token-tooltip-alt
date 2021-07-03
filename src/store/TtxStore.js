let TtxStore;

const initStore = () => {
  TtxStore = Vuex.createStore({
    modules: {
      TtxStore: {
        namespaced: true,
        state() {
          return {};
        },
        getters: {},
        actions: {},
        mutations: {},
      },
    },
  });
};

export {
  TtxStore,
  initStore,
};
