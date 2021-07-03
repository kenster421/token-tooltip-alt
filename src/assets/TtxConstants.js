import { i18n, OLD_MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';

const TTX_CONSTANTS = {
  SETTING_KEYS: {
    SETTINGS_EDITOR: {
      ID: 'SettingsEditor',
      ICON: 'fas fa-edit',
      RESTRICTED: false,
      NAME() { return i18n('settings.SETTINGS_EDITOR.name'); },
      LABEL() { return i18n('settings.SETTINGS_EDITOR.label'); },
    },
  },
  TEMPLATES: {
    SETTINGS_EDITOR: `modules/${OLD_MODULE_NAME}/src/foundry-integration/templates/ttx-settings-editor.hbs`,
  },
  APPS: {
    DEFAULT_VALUES: {
      width: 600,
      resizable: true,
      submitOnChange: false,
      closeOnSubmit: false,
      submitOnClose: false,
    },
  },
  DEFAULT_SYSTEM: 'default',
  SYSTEM_THEME: {
    default: 'default',
  },
  TOOLTIP_POSITIONS: ['top', 'right', 'bottom', 'left', 'overlay'],
  DEPENDENCIES: [
    {
      name: 'mathjs',
      options: {
        scripts: 'https://cdn.jsdelivr.net/npm/mathjs@9.4.1/lib/browser/math.min.js',
      },
    },
    {
      name: 'vue',
      options: {
        scripts: 'https://unpkg.com/vue@3.1.2/dist/vue.global.js',
      },
    },
    {
      name: 'vuex',
      options: {
        scripts: 'https://unpkg.com/vuex@4.0.2/dist/vuex.global.js',
        dependencies: 'vue',
      },
    },
  ],
};

const getSystemTheme = () => {
  const systemId = game.system.id;
  const { DEFAULT_SYSTEM, SYSTEM_THEME } = TTX_CONSTANTS;
  return SYSTEM_THEME[systemId] || SYSTEM_THEME[DEFAULT_SYSTEM];
};

export { getSystemTheme, TTX_CONSTANTS };
