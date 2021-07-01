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

export {
  setSetting,
  asyncSetSetting,

  getSetting,

  registerSettings,
  registerMenu,
};
