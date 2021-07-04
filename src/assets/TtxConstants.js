import { i18n, OLD_MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';

const TTX_CONSTANTS = {
  SETTING: {
    SETTINGS_EDITOR: {
      ID: 'SettingsEditor',
      ICON: 'fas fa-cogs',
      RESTRICTED: false,
      NAME() { return i18n('settings.SETTINGS_EDITOR.name'); },
      LABEL() { return i18n('settings.SETTINGS_EDITOR.label'); },
    },
    SETTINGS_EDITOR_SETTINGS: {
      // if something is in here only show the tooltip while the button is pressed
      SHOW_ONLY_WHILE_HOLDING_KEY: {
        ID: 'ShowOnlyWhileHoldingKey',
        RESTRICTED: false,
        TYPE: 'string',
        FOUNDRY_TYPE: String,
        SCOPE: 'client',
        DEFAULT: '',
        NAME() { return i18n('settings.SHOW_ONLY_WHILE_HOLDING_KEY.name'); },
        HINT() { return i18n('settings.SHOW_ONLY_WHILE_HOLDING_KEY.hint'); },
      },
      // show tooltips for all tokens when holding ALT
      SHOW_ALL: {
        ID: 'ShowAll',
        RESTRICTED: false,
        TYPE: 'boolean',
        FOUNDRY_TYPE: Boolean,
        SCOPE: 'client',
        DEFAULT: true,
        NAME() { return i18n('settings.SHOW_ALL.name'); },
        HINT() { return i18n('settings.SHOW_ALL.hint'); },
      },
      // when showing all tooltips also show tooltips for hidden tokens
      SHOW_ALL_HIDDEN: {
        ID: 'ShowAllHidden',
        RESTRICTED: true,
        TYPE: 'boolean',
        FOUNDRY_TYPE: Boolean,
        SCOPE: 'world',
        DEFAULT: false,
        NAME() { return i18n('settings.SHOW_ALL_HIDDEN.name'); },
        HINT() { return i18n('settings.SHOW_ALL_HIDDEN.hint'); },
      },
    },
    TOOLTIP_EDITOR: {
      ID: 'TooltipEditor',
      ICON: 'fas fa-comment-alt',
      RESTRICTED: false,
      TYPE: 'button',
      NAME() { return i18n('settings.TOOLTIP_EDITOR.name'); },
      LABEL() { return i18n('settings.TOOLTIP_EDITOR.label'); },
      HINT() { return i18n('settings.TOOLTIP_EDITOR.hint'); },
    },
    TOOLTIP_EDITOR_SETTINGS: {
      GLOBAL_TOOLTIP_SETTINGS: {
        ID: 'GlobalTooltipSettings',
        RESTRICTED: true,
        FOUNDRY_TYPE: Object,
        SCOPE: 'world',
        DEFAULT: {
          gm: {},
          user: {},
          initialized: false,
        },
      },
      OWNED_TOOLTIP_SETTINGS: {
        ID: 'OwnedTooltipSettings',
        RESTRICTED: false,
        FOUNDRY_TYPE: Object,
        SCOPE: 'client',
        DEFAULT: {
          initialized: false,
        },
      },
      // determines if the tooltip should use the dark theme
      DARK_THEME: {},
      // determines where the tooltip will be positioned
      TOOLTIP_POSITION: {},
      // between 1 and 2.5, ignored if tooltip position is overlay
      FONT_SIZE: {},
      // the number of items per row, default 5, max 20
      MAX_NUMBER_OF_ITEMS_PER_ROW: {},
      // where the data for the tooltip is taken from
      DATA_SOURCE: {},
    },
  },
  TEMPLATES: {
    SETTINGS_EDITOR: `modules/${OLD_MODULE_NAME}/src/foundry-integration/templates/ttx-settings-editor.hbs`,
    TOOLTIP_EDITOR: `modules/${OLD_MODULE_NAME}/src/foundry-integration/templates/ttx-tooltip-editor.hbs`,
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
        scripts: 'https://unpkg.com/vue@3.1.2/dist/vue.global.prod.js',
      },
    },
    {
      name: 'vuex',
      options: {
        scripts: 'https://unpkg.com/vuex@4.0.2/dist/vuex.global.prod.js',
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
