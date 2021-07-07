import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { OLD_MODULE_NAME } from './TtxFoundryUtils.js';
import TtxFoundrySettingsEditor from './apps/TtxFoundrySettingsEditor.js';

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
  const {
    SHOW_ONLY_WHILE_HOLDING_KEY, SHOW_AFTER_DELAY, SHOW_ALL, SHOW_ALL_HIDDEN,
  } = SETTINGS_EDITOR_SETTINGS;

  return [
    {
      key: SHOW_ONLY_WHILE_HOLDING_KEY.ID,
      settings: {
        type: SHOW_ONLY_WHILE_HOLDING_KEY.FOUNDRY_TYPE,
        restricted: SHOW_ONLY_WHILE_HOLDING_KEY.RESTRICTED,
        default: SHOW_ONLY_WHILE_HOLDING_KEY.DEFAULT,
        scope: SHOW_ONLY_WHILE_HOLDING_KEY.SCOPE,
      },
    },
    {
      key: SHOW_AFTER_DELAY.ID,
      settings: {
        type: SHOW_AFTER_DELAY.FOUNDRY_TYPE,
        restricted: SHOW_AFTER_DELAY.RESTRICTED,
        default: SHOW_AFTER_DELAY.DEFAULT,
        scope: SHOW_AFTER_DELAY.SCOPE,
      },
    },
    {
      key: SHOW_ALL.ID,
      settings: {
        type: SHOW_ALL.FOUNDRY_TYPE,
        restricted: SHOW_ALL.RESTRICTED,
        default: SHOW_ALL.DEFAULT,
        scope: SHOW_ALL.SCOPE,
      },
    },
    {
      key: SHOW_ALL_HIDDEN.ID,
      settings: {
        type: SHOW_ALL_HIDDEN.FOUNDRY_TYPE,
        restricted: SHOW_ALL_HIDDEN.RESTRICTED,
        default: SHOW_ALL_HIDDEN.DEFAULT,
        scope: SHOW_ALL_HIDDEN.SCOPE,
      },
    },
  ];
};

const tooltipEditorSettings = () => {
  const { TOOLTIP_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
  const { GLOBAL_TOOLTIP_SETTINGS, OWNED_TOOLTIP_SETTINGS } = TOOLTIP_EDITOR_SETTINGS;

  return [
    {
      key: GLOBAL_TOOLTIP_SETTINGS.ID,
      settings: {
        type: GLOBAL_TOOLTIP_SETTINGS.FOUNDRY_TYPE,
        restricted: GLOBAL_TOOLTIP_SETTINGS.RESTRICTED,
        default: GLOBAL_TOOLTIP_SETTINGS.DEFAULT,
        scope: GLOBAL_TOOLTIP_SETTINGS.SCOPE,
      },
    },
    {
      key: OWNED_TOOLTIP_SETTINGS.ID,
      settings: {
        type: OWNED_TOOLTIP_SETTINGS.FOUNDRY_TYPE,
        restricted: OWNED_TOOLTIP_SETTINGS.RESTRICTED,
        default: OWNED_TOOLTIP_SETTINGS.DEFAULT,
        scope: OWNED_TOOLTIP_SETTINGS.SCOPE,
      },
    },
  ];
};

const otherSettings = () => {
  const { OTHER_SETTINGS } = TTX_CONSTANTS.SETTING;
  const { MODULE_VERSION } = OTHER_SETTINGS;
  return [
    {
      key: MODULE_VERSION.ID,
      settings: {
        type: MODULE_VERSION.FOUNDRY_TYPE,
        restricted: MODULE_VERSION.RESTRICTED,
        default: MODULE_VERSION.DEFAULT,
        scope: MODULE_VERSION.SCOPE,
      },
    },
  ];
};

const initSettings = () => {
  registerSettingsEditor();
  registerSettings([
    ...settingsEditorSettings(),
    ...tooltipEditorSettings(),
    ...otherSettings(),
  ]);
};

export { initSettings };
