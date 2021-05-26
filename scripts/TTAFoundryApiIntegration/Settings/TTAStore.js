import { TTAConstants } from '../../TTAConstants/TTAConstants.js';
import { getSetting } from './TTASettingsUtils.js';

let TTAState = null;
const watchedSettings = [
  TTAConstants.SETTING_KEYS.GM_SETTINGS,
  TTAConstants.SETTING_KEYS.PLAYER_SETTINGS,
  TTAConstants.SETTING_KEYS.OWNED_SETTINGS,
  TTAConstants.SETTING_KEYS.DARK_THEME,
  TTAConstants.SETTING_KEYS.MAX_ROWS,
  TTAConstants.SETTING_KEYS.FONT_SIZE,
];

function getSettingsFromFoundry() {
  return watchedSettings.reduce((obj, setting) => ({ ...obj, [setting]: getSetting(setting) }), {});
}

function getSettingsSubjects() {
  return watchedSettings.reduce((obj, setting) => ({ ...obj, [`${setting}$`]: new rxjs.Subject() }), {});
}

function next(setting) {
  TTAState[`${setting}$`].next(TTAState[setting]);
}

function initState() {
  TTAState = {
    ...getSettingsFromFoundry(),
    ...getSettingsSubjects(),
  };

  watchedSettings.forEach(next);
}

function state$(setting) {
  return TTAState[`${setting}$`];
}

function mutate(mutation, setting) {
  TTAState[setting] = mutation({ ...TTAState[setting] });
  next(setting);
}

export {
  initState,
  state$,
  mutate,
};
