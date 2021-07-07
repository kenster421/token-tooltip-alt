import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { getSetting, asyncSetSetting } from '../foundry-integration/TtxFoundrySettingsUtils.js';
import { orderedDispositionsList } from '../foundry-integration/TtxFoundryUtils.js';

let TtxStore;

const initStore = () => {
  const { SETTINGS_EDITOR_SETTINGS, TOOLTIP_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const {
    SHOW_HINTS, SHOW_ONLY_WHILE_HOLDING_KEY, SHOW_AFTER_DELAY, SHOW_ALL, SHOW_ALL_HIDDEN,
  } = SETTINGS_EDITOR_SETTINGS;
  const {
    GLOBAL_TOOLTIP_SETTINGS, OWNED_TOOLTIP_SETTINGS, DEFAULT_ACTOR_TYPE,
  } = TOOLTIP_EDITOR_SETTINGS;

  TtxStore = Vuex.createStore({
    modules: {
      TtxStore: {
        namespaced: true,
        state() {
          return {
            isUserGM: game.user?.isGM || false,
            settingsEditor: {
              showHints: getSetting(SHOW_HINTS.ID),
              showOnlyWhileHoldingKey: getSetting(SHOW_ONLY_WHILE_HOLDING_KEY.ID),
              showAfterDelay: getSetting(SHOW_AFTER_DELAY.ID),
              showAll: getSetting(SHOW_ALL.ID),
              showAllHidden: getSetting(SHOW_ALL_HIDDEN.ID),
            },
            tooltipEditor: {
              globalTooltipSettings: getSetting(GLOBAL_TOOLTIP_SETTINGS.ID),
              ownedTooltipSettings: getSetting(OWNED_TOOLTIP_SETTINGS.ID),
              actorTypes: [DEFAULT_ACTOR_TYPE, ...(game.system?.entityTypes?.Actor || [])],
              dispositions: orderedDispositionsList(),
            },
          };
        },
        getters: {
          showHints(state) {
            return state.settingsEditor.showHints;
          },
          showOnlyWhileHoldingKey(state) {
            return state.settingsEditor.showOnlyWhileHoldingKey;
          },
          showAfterDelay(state) {
            return state.settingsEditor.showAfterDelay;
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
          actorTypes(state) {
            return state.tooltipEditor.actorTypes;
          },
          dispositions(state) {
            return state.tooltipEditor.dispositions;
          },
        },
        actions: {
          setShowHints({ commit }, showHints) {
            asyncSetSetting(SHOW_HINTS.ID, showHints)
              .then(() => commit('SET_SHOW_HINTS', showHints));
          },
          setShowOnlyWhileHoldingKey({ commit }, showOnlyWhileHoldingKey) {
            asyncSetSetting(SHOW_ONLY_WHILE_HOLDING_KEY.ID, showOnlyWhileHoldingKey)
              .then(() => commit('SET_SHOW_ONLY_WHILE_HOLDING_KEY', showOnlyWhileHoldingKey));
          },
          setShowAfterDelay({ commit }, showAfterDelay) {
            asyncSetSetting(SHOW_AFTER_DELAY.ID, showAfterDelay)
              .then(() => commit('SHOW_AFTER_DELAY', showAfterDelay));
          },
          setShowAll({ commit }, showAll) {
            asyncSetSetting(SHOW_ALL.ID, showAll)
              .then(() => commit('SET_SHOW_ALL', showAll));
          },
          setShowAllHidden({ commit }, showAllHidden) {
            asyncSetSetting(SHOW_ALL_HIDDEN.ID, showAllHidden)
              .then(() => commit('SET_SHOW_ALL', showAllHidden));
          },
          setGlobalTooltipSettings({ commit }, globalTooltipSettings) {
            asyncSetSetting(GLOBAL_TOOLTIP_SETTINGS.ID, globalTooltipSettings)
              .then(() => commit('SET_GLOBAL_TOOLTIP_SETTINGS', globalTooltipSettings));
          },
          setOwnedTooltipSettings({ commit }, ownedTooltipSettings) {
            asyncSetSetting(OWNED_TOOLTIP_SETTINGS.ID, ownedTooltipSettings)
              .then(() => commit('SET_OWNED_TOOLTIP_SETTINGS', ownedTooltipSettings));
          },
        },
        mutations: {
          SET_SHOW_HINTS(state, showHints) {
            state.settingsEditor.showHints = showHints;
          },
          SET_SHOW_ONLY_WHILE_HOLDING_KEY(state, showOnlyWhileHoldingKey) {
            state.settingsEditor.showOnlyWhileHoldingKey = showOnlyWhileHoldingKey;
          },
          SHOW_AFTER_DELAY(state, showAfterDelay) {
            state.settingsEditor.showAfterDelay = showAfterDelay;
          },
          SET_SHOW_ALL(state, showAll) {
            state.settingsEditor.showAll = showAll;
          },
          SET_SHOW_ALL_HIDDEN(state, showAllHidden) {
            state.settingsEditor.showAllHidden = showAllHidden;
          },
          SET_GLOBAL_TOOLTIP_SETTINGS(state, globalTooltipSettings) {
            state.tooltipEditor.globalTooltipSettings = globalTooltipSettings;
          },
          SET_OWNED_TOOLTIP_SETTINGS(state, ownedTooltipSettings) {
            state.tooltipEditor.ownedTooltipSettings = ownedTooltipSettings;
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
