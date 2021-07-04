import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { getSetting, asyncSetSetting } from '../foundry-integration/TtxFoundrySettingsUtils.js';

let TtxStore;

const initStore = () => {
  const { SETTINGS_EDITOR_SETTINGS, TOOLTIP_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const { SHOW_ONLY_WHILE_HOLDING_KEY, SHOW_ALL, SHOW_ALL_HIDDEN } = SETTINGS_EDITOR_SETTINGS;
  const { GLOBAL_TOOLTIP_SETTINGS, OWNED_TOOLTIP_SETTINGS } = TOOLTIP_EDITOR_SETTINGS;

  TtxStore = Vuex.createStore({
    modules: {
      TtxStore: {
        namespaced: true,
        state() {
          return {
            isUserGM: game.user?.isGM || false,
            settingsEditor: {
              showOnlyWhileHoldingKey: getSetting(SHOW_ONLY_WHILE_HOLDING_KEY.ID),
              showAll: getSetting(SHOW_ALL.ID),
              showAllHidden: getSetting(SHOW_ALL_HIDDEN.ID),
            },
            tooltipEditor: {
              globalTooltipSettings: getSetting(GLOBAL_TOOLTIP_SETTINGS.ID),
              ownedTooltipSettings: getSetting(OWNED_TOOLTIP_SETTINGS.ID),
            },
          };
        },
        getters: {
          showOnlyWhileHoldingKey(state) {
            return state.settingsEditor.showOnlyWhileHoldingKey;
          },
          showAll(state) {
            return state.settingsEditor.showAll;
          },
          showAllHidden(state) {
            return state.settingsEditor.showAllHidden;
          },
          globalTooltipSettings(state) {
            return state.tooltipEditor.globalTooltipSettings;
          },
          ownedTooltipSettings(state) {
            return state.tooltipEditor.ownedTooltipSettings;
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
          setGlobalTooltipSettings({ commit }, globalTooltipSettings) {
            return commit('SET_GLOBAL_TOOLTIP_SETTINGS', globalTooltipSettings);
          },
          setOwnedTooltipSettings({ commit }, ownedTooltipSettings) {
            return commit('SET_OWNED_TOOLTIP_SETTINGS', ownedTooltipSettings);
          },
        },
        mutations: {
          SET_SHOW_ONLY_WHILE_HOLDING_KEY(state, showOnlyWhileHoldingKey) {
            asyncSetSetting(SHOW_ONLY_WHILE_HOLDING_KEY.ID, showOnlyWhileHoldingKey)
              .then(() => {
                state.settingsEditor.showOnlyWhileHoldingKey = showOnlyWhileHoldingKey;
              });
          },
          SET_SHOW_ALL(state, showAll) {
            asyncSetSetting(SHOW_ALL.ID, showAll)
              .then(() => { state.settingsEditor.showAll = showAll; });
          },
          SET_SHOW_ALL_HIDDEN(state, showAllHidden) {
            asyncSetSetting(SHOW_ALL_HIDDEN.ID, showAllHidden)
              .then(() => { state.settingsEditor.showAllHidden = showAllHidden; });
          },
          SET_GLOBAL_TOOLTIP_SETTINGS(state, globalTooltipSettings) {
            asyncSetSetting(GLOBAL_TOOLTIP_SETTINGS.ID, globalTooltipSettings)
              .then(() => { state.tooltipEditor.globalTooltipSettings = globalTooltipSettings; });
          },
          SET_OWNED_TOOLTIP_SETTINGS(state, ownedTooltipSettings) {
            asyncSetSetting(OWNED_TOOLTIP_SETTINGS.ID, ownedTooltipSettings)
              .then(() => { state.tooltipEditor.ownedTooltipSettings = ownedTooltipSettings; });
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
