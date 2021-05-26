import { TTAConstants } from '../../TTAConstants/TTAConstants.js';
import { getSetting } from './TTASettingsUtils.js';

let TTAState = null;
let TTAState$ = null;
const watchedSettings = [
  TTAConstants.SETTING_KEYS.GM_SETTINGS,
  TTAConstants.SETTING_KEYS.PLAYER_SETTINGS,
  TTAConstants.SETTING_KEYS.OWNED_SETTINGS,
  TTAConstants.SETTING_KEYS.DARK_THEME,
  TTAConstants.SETTING_KEYS.MAX_ROWS,
  TTAConstants.SETTING_KEYS.FONT_SIZE,
];

function getSettingsFromFoundry(settingsToAdd = watchedSettings) {
  return settingsToAdd.reduce((obj, setting) => ({ ...obj, [setting]: getSetting(setting) }), {});
}

function next(settings = TTAState) {
  TTAState$.next(settings);
}

function initState() {
  TTAState = getSettingsFromFoundry();
  TTAState$ = new rxjs.Subject();
  next();
}

function state$() {
  return TTAState$;
}

function mutate(mutation) {
  TTAState = mutation({ ...TTAState });
  next();
}

export {
  initState,
  state$,
  mutate,
};
