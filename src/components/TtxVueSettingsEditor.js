import { debounce, log, MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';
import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { TtxStore } from '../store/TtxStore.js';

const template = () => (`
  <div class="settings-list">
    <div v-for="setting in settings" :key="setting.name" class="form-group">
      <label>{{ setting.name }}</label>
      <div class="form-fields">
        <input 
          v-if="setting.type === 'boolean'" 
          type="checkbox" 
          :name="fieldName(setting.id)" 
          :data-dtype="setting.type"
          :checked="setting.value"
          @change="setting.onChange($event)"
        />
        <input 
          v-else-if="setting.type === 'string'" 
          type="text" 
          :name="fieldName(setting.id)" 
          :data-dtype="setting.type"
          :value="setting.value"
          @change="setting.onChange($event)"
        />
      </div>
      <p class="notes">{{ setting.hint }}</p>
    </div>
  </div>
`);

const config = () => ({
  template: template(),
  setup() {
    const { SETTINGS_EDITOR_SETTINGS } = TTX_CONSTANTS.SETTING;
    const { SHOW_ONLY_WHILE_HOLDING_KEY, SHOW_ALL, SHOW_ALL_HIDDEN } = SETTINGS_EDITOR_SETTINGS;

    const { computed, ref } = Vue;
    const store = Vuex.useStore();

    const showOnlyWhileHoldingKey = computed(() => store.getters['TtxStore/showOnlyWhileHoldingKey']);
    const showAll = computed(() => store.getters['TtxStore/showAll']);
    const showAllHidden = computed(() => store.getters['TtxStore/showAllHidden']);

    const moduleName = ref(MODULE_NAME);
    const settings = ref([
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

    const fieldName = (fieldId) => `${moduleName.value}.${fieldId}`;

    return {
      moduleName,
      fieldName,
      settings,
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
