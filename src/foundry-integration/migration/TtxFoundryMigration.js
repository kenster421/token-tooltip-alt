import { TTX_CONSTANTS } from '../../assets/TtxConstants.js';
import { asyncSetSetting, getSetting } from '../TtxFoundrySettingsUtils.js';
import { MODULE_VERSION } from '../TtxFoundryUtils.js';

const setCurrentVersion = () => {
  const { OTHER_SETTINGS } = TTX_CONSTANTS.SETTING;
  return asyncSetSetting(OTHER_SETTINGS.MODULE_VERSION.ID, MODULE_VERSION);
};

const getOldVersion = () => {
  const { OTHER_SETTINGS } = TTX_CONSTANTS.SETTING;
  return getSetting(OTHER_SETTINGS.MODULE_VERSION.ID);
};

const migrate300To400 = () => setCurrentVersion();

const migrateToTheLatestVersion = (fnCallback) => {
  const oldVersion = getOldVersion();
  if (oldVersion === '3.0.0') return migrate300To400().then(fnCallback);

  return fnCallback();
};

export {
  migrateToTheLatestVersion,
};
