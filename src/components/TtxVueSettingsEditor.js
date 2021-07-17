import { MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';
import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { TtxStore } from '../store/TtxStore.js';
import TtxFoundryTooltipEditor from '../foundry-integration/apps/TtxFoundryTooltipEditor.js';

const template = /* html */`
  <div class="settings-list">
    <div class="form-group submenu">
      <label>{{ tooltipEditor.name }}</label>
      <button 
        type="button" 
        :data-key="name(tooltipEditor.id, '.')"
        @click="tooltipEditor.onClick($event)"
      >
          <i class="fas fa-comment-alt" />
          <label>{{ tooltipEditor.label }}</label>
      </button>
      <p v-if="showHints" class="notes">{{ tooltipEditor.hint }}</p>
    </div>
    <div 
      v-for="setting in userSettings" 
      :key="setting.name" 
      class="form-group"
    >
      <label>{{ setting.name }}</label>
      <div class="form-fields">
        <input 
          v-if="setting.type === 'boolean'" 
          type="checkbox" 
          :name="name(setting.id, '.')" 
          :data-dtype="setting.type"
          :checked="setting.value"
          @change="setting.onChange($event)"
        />
        <input 
          v-else-if="setting.type === 'string'" 
          type="text" 
          :name="name(setting.id, '.')" 
          :data-dtype="setting.type"
          :value="setting.value"
          @change="setting.onChange($event)"
        />
        <input 
          v-else-if="setting.type === 'number'" 
          type="number" 
          :name="name(setting.id, '.')" 
          :data-dtype="setting.type"
          :value="setting.value"
          @change="setting.onChange($event)"
        />
      </div>
      <p v-if="showHints" class="notes">{{ setting.hint }}</p>
    </div>
  </div>
`;

const config = () => ({
  template,
  setup() {
    const { SETTINGS_EDITOR_SETTINGS, TOOLTIP_EDITOR } = TTX_CONSTANTS.SETTING;
    const {
      SHOW_HINTS,
      SHOW_ONLY_WHILE_HOLDING_KEY,
      SHOW_AFTER_DELAY,
      SHOW_ALL,
      SHOW_ALL_HIDDEN,
    } = SETTINGS_EDITOR_SETTINGS;

    const { computed, ref } = Vue;
    const store = Vuex.useStore();

    const showHints = computed(() => store.getters['TtxStore/showHints']);
    const showOnlyWhileHoldingKey = computed(() => store.getters['TtxStore/showOnlyWhileHoldingKey']);
    const showAfterDelay = computed(() => store.getters['TtxStore/showAfterDelay']);
    const showAll = computed(() => store.getters['TtxStore/showAll']);
    const showAllHidden = computed(() => store.getters['TtxStore/showAllHidden']);
    const isUserGM = computed(() => store.getters['TtxStore/isUserGM']);

    const moduleName = ref(MODULE_NAME);
    const name = (originalName, separator = '-') => `${moduleName.value}${separator}${originalName}`;

    const tooltipEditor = ref({
      id: TOOLTIP_EDITOR.ID,
      icon: TOOLTIP_EDITOR.ICON,
      RESTRICTED: TOOLTIP_EDITOR.RESTRICTED,
      name: TOOLTIP_EDITOR.NAME(),
      label: TOOLTIP_EDITOR.LABEL(),
      hint: TOOLTIP_EDITOR.HINT(),
      onClick() {
        return new TtxFoundryTooltipEditor().render(true);
      },
    });
    const settings = ref([
      {
        id: SHOW_HINTS.ID,
        restricted: SHOW_HINTS.RESTRICTED, // if only the GM can change it
        scope: SHOW_HINTS.SCOPE, // TODO: support for the scope module
        type: SHOW_HINTS.TYPE,
        name: SHOW_HINTS.NAME(),
        hint: SHOW_HINTS.HINT(),
        value: showHints.value,
        onChange(event) {
          const value = event?.target?.checked;
          if (value === undefined) return;

          store.dispatch('TtxStore/setShowHints', value);
        },
      },
      {
        id: SHOW_ONLY_WHILE_HOLDING_KEY.ID,
        restricted: SHOW_ONLY_WHILE_HOLDING_KEY.RESTRICTED, // if only the GM can change it
        scope: SHOW_ONLY_WHILE_HOLDING_KEY.SCOPE, // TODO: support for the scope module
        type: SHOW_ONLY_WHILE_HOLDING_KEY.TYPE,
        name: SHOW_ONLY_WHILE_HOLDING_KEY.NAME(),
        hint: SHOW_ONLY_WHILE_HOLDING_KEY.HINT(),
        value: showOnlyWhileHoldingKey.value,
        onChange(event) {
          const value = event?.target?.value;
          if (value === undefined) return;

          store.dispatch('TtxStore/setShowOnlyWhileHoldingKey', value);
        },
      },
      {
        id: SHOW_AFTER_DELAY.ID,
        restricted: SHOW_AFTER_DELAY.RESTRICTED, // if only the GM can change it
        scope: SHOW_AFTER_DELAY.SCOPE, // TODO: support for the scope module
        type: SHOW_AFTER_DELAY.TYPE,
        name: SHOW_AFTER_DELAY.NAME(),
        hint: SHOW_AFTER_DELAY.HINT(),
        value: showAfterDelay.value,
        onChange(event) {
          const value = event?.target?.value;
          if (value === undefined) return;

          store.dispatch('TtxStore/setShowAfterDelay', value);
        },
      },
      {
        id: SHOW_ALL.ID,
        restricted: SHOW_ALL.RESTRICTED, // if only the GM can change it
        scope: SHOW_ALL.SCOPE, // TODO: support for the scope module
        type: SHOW_ALL.TYPE,
        name: SHOW_ALL.NAME(),
        hint: SHOW_ALL.HINT(),
        value: showAll.value,
        onChange(event) {
          const value = event?.target?.checked;
          if (value === undefined) return;

          store.dispatch('TtxStore/setShowAll', value);
        },
      },
      {
        id: SHOW_ALL_HIDDEN.ID,
        restricted: SHOW_ALL_HIDDEN.RESTRICTED, // if only the GM can change it
        scope: SHOW_ALL_HIDDEN.SCOPE, // TODO: support for the scope module
        type: SHOW_ALL_HIDDEN.TYPE,
        name: SHOW_ALL_HIDDEN.NAME(),
        hint: SHOW_ALL_HIDDEN.HINT(),
        value: showAllHidden.value,
        onChange(event) {
          const value = event?.target?.checked;
          if (value === undefined) return;

          store.dispatch('TtxStore/setShowAll', value);
        },
      },
    ]);
    const userSettings = computed(() => settings.value.filter(
      (userSetting) => !userSetting.restricted || (userSetting.restricted && isUserGM.value),
    ));

    return {
      showHints,
      moduleName,
      name,
      tooltipEditor,
      userSettings,
      isUserGM,
    };
  },
});

const TtxVueSettingsEditor = (id) => {
  const app = Vue.createApp(config());
  const store = TtxStore;

  app.use(store);
  app.mount(id);
};

export default TtxVueSettingsEditor;
