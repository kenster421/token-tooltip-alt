import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import TtxSettingsEditor from './apps/TtxSettingsEditor.js';
import { MODULE_NAME } from './TtxFoundryUtils.js';

const asyncSetSetting = (key, data) => game.settings.set(MODULE_NAME, key, data);
const setSetting = async (key, data) => {
  await asyncSetSetting(key, data);
};

const getSetting = (key) => game.settings.get(MODULE_NAME, key);

const registerSetting = (key, data) => game.settings.register(MODULE_NAME, key, data);
const registerSettings = (items) => {
  items.forEach((item) => registerSetting(item.key, item.settings));
};
const registerMenu = (key, data) => game.settings.registerMenu(MODULE_NAME, key, data);

const registerSettingsEditor = () => {
  const { SETTINGS_EDITOR } = TTX_CONSTANTS.SETTING_KEYS;
  registerMenu(SETTINGS_EDITOR.ID, {
    name: SETTINGS_EDITOR.NAME(),
    label: SETTINGS_EDITOR.LABEL(),
    icon: SETTINGS_EDITOR.ICON,
    restricted: SETTINGS_EDITOR.RESTRICTED,
    type: TtxSettingsEditor,
  });
};

const initSettings = () => {
  const CONFIGURE_SETTINGS = [];

  registerSettingsEditor();
  registerSettings(CONFIGURE_SETTINGS);
};

export {
  setSetting,
  asyncSetSetting,

  getSetting,

  initSettings,
};
