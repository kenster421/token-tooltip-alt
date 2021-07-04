import { OLD_MODULE_NAME } from './TtxFoundryUtils.js';

const getSetting = (key) => game.settings.get(OLD_MODULE_NAME, key);

const asyncSetSetting = (key, data) => game.settings.set(OLD_MODULE_NAME, key, data);
const setSetting = async (key, data) => {
  await asyncSetSetting(key, data);
};

export {
  getSetting,
  asyncSetSetting,
  setSetting,
};
