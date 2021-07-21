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
      // if to show hints or not, makes the settings more compact
      SHOW_HINTS: {
        ID: 'ShowHints',
        RESTRICTED: false,
        TYPE: 'boolean',
        FOUNDRY_TYPE: Boolean,
        SCOPE: 'client',
        DEFAULT: true,
        NAME() { return i18n('settings.SHOW_HINTS.name'); },
        HINT() { return i18n('settings.SHOW_HINTS.hint'); },
      },
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
      // how long do you have to hover on the token before showing it
      SHOW_AFTER_DELAY: {
        ID: 'ShowAfterDelay',
        RESTRICTED: false,
        TYPE: 'number',
        FOUNDRY_TYPE: Number,
        SCOPE: 'client',
        DEFAULT: 0,
        NAME() { return i18n('settings.SHOW_AFTER_DELAY.name'); },
        HINT() { return i18n('settings.SHOW_AFTER_DELAY.hint'); },
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
          gamemaster: {},
          player: {},
          initialized: false,
        },
      },
      OWNED_TOOLTIP_SETTINGS: {
        ID: 'OwnedTooltipSettings',
        RESTRICTED: false,
        FOUNDRY_TYPE: Object,
        SCOPE: 'client',
        DEFAULT: {},
      },
      ACTOR_TYPES: {
        ID: 'ActorTypes',
        NAME() { return i18n('settings.ACTOR_TYPES.name'); },
        HINT() { return i18n('settings.ACTOR_TYPES.hint'); },
      },
      DEFAULT_ACTOR_TYPE: 'default',
      DISPOSITIONS: {
        ID: 'Dispositions',
        NAME() { return i18n('settings.DISPOSITIONS.name'); },
        HINT() { return i18n('settings.DISPOSITIONS.hint'); },
      },
      OWNED_DISPOSITION: 'owned',
      DEFAULT_DISPOSITION: 'friendly',
      USER_TYPES: {
        ID: 'UserTypes',
        NAME() { return i18n('settings.USER_TYPES.name'); },
        HINT() { return i18n('settings.USER_TYPES.hint'); },
        OPTIONS: [
          {
            value: 'gamemaster',
            name() { return i18n('settings.USER_TYPES.gamemaster'); },
          },
          {
            value: 'player',
            name() { return i18n('settings.USER_TYPES.player'); },
          },
        ],
      },
      TOOLTIP_EDITOR_LAYOUT: {
        ID: 'TooltipEditorLayout',
        RESTRICTED: false,
        FOUNDRY_TYPE: Boolean,
        SCOPE: 'client',
        DEFAULT: true,
      },
      CLIPBOARD: {
        ID: 'Clipboard',
        RESTRICTED: false,
        FOUNDRY_TYPE: Object,
        SCOPE: 'client',
        DEFAULT: {
          empty: true,
        },
      },
      USE_GAMEMASTER_SETTINGS: {
        ID: 'useGamemasterSettings',
        TYPE: 'boolean',
        DEFAULT: true,
        NAME() { return i18n('settings.USE_GAMEMASTER_SETTINGS.name'); },
        HINT() { return i18n('settings.USE_GAMEMASTER_SETTINGS.hint'); },
      },
      USE_DEFAULT: {
        ID: 'useDefault',
        TYPE: 'boolean',
        DEFAULT: true,
        NAME() { return i18n('settings.USE_DEFAULT.name'); },
        HINT() { return i18n('settings.USE_DEFAULT.hint'); },
      },
      DARK_THEME: {
        ID: 'darkTheme',
        TYPE: 'boolean',
        DEFAULT: false,
        NAME() { return i18n('settings.DARK_THEME.name'); },
        HINT() { return i18n('settings.DARK_THEME.hint'); },
      },
      TOOLTIP_POSITION: {
        ID: 'tooltipPosition',
        TYPE: 'select',
        DEFAULT: 'right',
        NAME() { return i18n('settings.TOOLTIP_POSITION.name'); },
        HINT() { return i18n('settings.TOOLTIP_POSITION.hint'); },
        OPTIONS: [
          {
            value: 'top',
            name() { return i18n('settings.TOOLTIP_POSITION.top'); },
          },
          {
            value: 'right',
            name() { return i18n('settings.TOOLTIP_POSITION.right'); },
          },
          {
            value: 'bottom',
            name() { return i18n('settings.TOOLTIP_POSITION.bottom'); },
          },
          {
            value: 'left',
            name() { return i18n('settings.TOOLTIP_POSITION.left'); },
          },
          {
            value: 'overlay',
            name() { return i18n('settings.TOOLTIP_POSITION.overlay'); },
          },
        ],
      },
      TOOLTIP_POSITION_DEFAULT: 'right',
      // TODO: see if still necessary
      FONT_SIZE: {},
      DATA_SOURCE: {
        ID: 'dataSource',
        TYPE: 'string',
        DEFAULT: 'actor.data.data',
        NAME() { return i18n('settings.DATA_SOURCE.name'); },
        HINT() { return i18n('settings.DATA_SOURCE.hint'); },
      },
      ITEMS: {
        ID: 'items',
        DEFAULT: [],
      },
    },
    OTHER_SETTINGS: {
      MODULE_VERSION: {
        ID: 'ModuleVersion',
        FOUNDRY_TYPE: String,
        RESTRICTED: true,
        SCOPE: 'world',
        DEFAULT: '3.0.0',
      },
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
