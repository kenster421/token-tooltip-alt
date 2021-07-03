import { i18n, OLD_MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';

const TTX_CONSTANTS = {
  SETTING: {
    SETTINGS_EDITOR: {
      ID: 'SettingsEditor',
      ICON: 'fas fa-edit',
      RESTRICTED: false,
      NAME() { return i18n('settings.SETTINGS_EDITOR.name'); },
      LABEL() { return i18n('settings.SETTINGS_EDITOR.label'); },
    },
    SETTINGS_EDITOR_SETTINGS: {
      // if something is in here only show the tooltip while the button is pressed
      SHOW_ONLY_WHILE_HOLDING_KEY: {},
      // show tooltips for all tokens when holding ALT
      SHOW_ALL: {},
      // when showing all tooltips also show tooltips for hidden tokens
      SHOW_ALL_HIDDEN: {},
      // determines if the tooltip should use the dark theme
      DARK_THEME: {},
    },
    TOOLTIP_EDITOR: {
      // determines where the tooltip will be positioned
      TOOLTIP_POSITION: {},
      // between 1 and 2.5, ignored if tooltip position is overlay
      FONT_SIZE: {},
      // the number of items per row, default 5, max 20
      MAX_NUMBER_OF_ITEMS_PER_ROW: {},
      // where the data for the tooltip is taken from
      DATA_SOURCE: {},
      // settings set by the DM
      GLOBAL_TOOLTIP_SETTINGS: {},
      // settings set by the user for their owned tokens
      OWNED_TOOLTIP_SETTINGS: {},
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
