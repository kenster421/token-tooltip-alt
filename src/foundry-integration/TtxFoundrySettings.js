import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import TtxFoundrySettingsEditor from './apps/TtxFoundrySettingsEditor.js';
import { OLD_MODULE_NAME } from './TtxFoundryUtils.js';

const asyncSetSetting = (key, data) => game.settings.set(OLD_MODULE_NAME, key, data);
const setSetting = async (key, data) => {
  await asyncSetSetting(key, data);
};

const getSetting = (key) => game.settings.get(OLD_MODULE_NAME, key);

const registerSetting = (key, data) => game.settings.register(OLD_MODULE_NAME, key, data);
const registerSettings = (items) => {
  items.forEach((item) => registerSetting(item.key, item.settings));
};
const registerMenu = (key, data) => game.settings.registerMenu(OLD_MODULE_NAME, key, data);

const registerSettingsEditor = () => {
  const { SETTINGS_EDITOR } = TTX_CONSTANTS.SETTING;
  registerMenu(SETTINGS_EDITOR.ID, {
    name: SETTINGS_EDITOR.NAME(),
    label: SETTINGS_EDITOR.LABEL(),
    icon: SETTINGS_EDITOR.ICON,
    restricted: SETTINGS_EDITOR.RESTRICTED,
    type: TtxFoundrySettingsEditor,
  });
};

const settingsEditorSettings = () => {
  const { SETTINGS_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;

  return [];
};

const initSettings = () => {
  registerSettingsEditor();

  const allSettings = [...settingsEditorSettings()];
  registerSettings(allSettings);
};

export {
  setSetting,
  asyncSetSetting,

  getSetting,

  settingsEditorSettings,
  initSettings,
};
