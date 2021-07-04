import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { getSetting, asyncSetSetting } from '../foundry-integration/TtxFoundrySettingsUtils.js';

let TtxStore;

const initStore = () => {
  const { SETTINGS_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const { SHOW_ONLY_WHILE_HOLDING_KEY, SHOW_ALL, SHOW_ALL_HIDDEN } = SETTINGS_EDITOR_SETTINGS;

  TtxStore = Vuex.createStore({
    modules: {
      TtxStore: {
        namespaced: true,
        state() {
          return {
            isUserGM: game.user?.isGM || false,
            tooltipEditor: {
              showOnlyWhileHoldingKey: getSetting(SHOW_ONLY_WHILE_HOLDING_KEY.ID),
              showAll: getSetting(SHOW_ALL.ID),
              showAllHidden: getSetting(SHOW_ALL_HIDDEN.ID),
            },
          };
        },
        getters: {
          showOnlyWhileHoldingKey(state) {
            return state.tooltipEditor.showOnlyWhileHoldingKey;
          },
          showAll(state) {
            return state.tooltipEditor.showAll;
          },
          showAllHidden(state) {
            return state.tooltipEditor.showAllHidden;
          },
          isUserGM(state) {
            return state.isUserGM;
          },
        },
        actions: {
          setShowOnlyWhileHoldingKey({ commit }, showOnlyWhileHoldingKey) {
            return commit('SET_SHOW_ONLY_WHILE_HOLDING_KEY', showOnlyWhileHoldingKey);
          },
          setShowAll({ commit }, showAll) {
            return commit('SET_SHOW_ALL', showAll);
          },
          setShowAllHidden({ commit }, showAllHidden) {
            return commit('SET_SHOW_ALL', showAllHidden);
          },
        },
        mutations: {
          SET_SHOW_ONLY_WHILE_HOLDING_KEY(state, showOnlyWhileHoldingKey) {
            asyncSetSetting(SHOW_ONLY_WHILE_HOLDING_KEY.ID, showOnlyWhileHoldingKey)
              .then(() => {
                state.tooltipEditor.showOnlyWhileHoldingKey = showOnlyWhileHoldingKey;
              });
          },
          SET_SHOW_ALL(state, showAll) {
            asyncSetSetting(SHOW_ALL.ID, showAll)
              .then(() => { state.tooltipEditor.showAll = showAll; });
          },
          SET_SHOW_ALL_HIDDEN(state, showAllHidden) {
            asyncSetSetting(SHOW_ALL_HIDDEN.ID, showAllHidden)
              .then(() => { state.tooltipEditor.showAllHidden = showAllHidden; });
          },
        },
      },
    },
  });
};

export {
  TtxStore,
  initStore,
};
