import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { OLD_MODULE_NAME } from './TtxFoundryUtils.js';
import TtxFoundrySettingsEditor from './apps/TtxFoundrySettingsEditor.js';
import TtxFoundryTooltipEditor from './apps/TtxFoundryTooltipEditor.js';

const registerSetting = (key, data) => game.settings.register(OLD_MODULE_NAME, key, data);
const registerSettings = (items) => {
  items.forEach((item) => registerSetting(item.key, item.settings));
};
const registerMenu = (key, data) => game.settings.registerMenu(OLD_MODULE_NAME, key, data);

const registerTooltipEditor = () => {
  const { TOOLTIP_EDITOR } = TTX_CONSTANTS.SETTING;
  registerMenu(TOOLTIP_EDITOR.ID, {
    name: TOOLTIP_EDITOR.NAME(),
    label: TOOLTIP_EDITOR.LABEL(),
    icon: TOOLTIP_EDITOR.ICON,
    restricted: TOOLTIP_EDITOR.RESTRICTED,
    type: TtxFoundryTooltipEditor,
  });
};

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
  const { SHOW_ONLY_WHILE_HOLDING_KEY, SHOW_ALL, SHOW_ALL_HIDDEN } = SETTINGS_EDITOR_SETTINGS;

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

const initSettings = () => {
  registerTooltipEditor();
  registerSettingsEditor();
  registerSettings([
    ...settingsEditorSettings(),
  ]);
};

export { initSettings };
