import TtxUseSelectionTooltipEditor from '../composables/TtxUseSelectionTooltipEditor.js';
import { MODULE_NAME, i18n } from '../foundry-integration/TtxFoundryUtils.js';
import { TtxStore } from '../store/TtxStore.js';

const selectionTemplate = () => /* html */`
  <div class="form-group">
  <label>{{ userTypeSettings.name }}</label>
  <div class="form-fields">
    <select v-model="selectedUserTypeValue" :name="name(userTypeSettings.id, '.')">
        <option 
          v-for="(userType, index) in userTypeSettings.options" 
          :key="userType.value"
          :value="userType.value"
        >
          {{ userType.name }}
        </option>
    </select>
  </div>
  <p v-if="showHints" class="notes">{{ userTypeSettings.hint }}</p>
  </div>

  <div class="form-group">
  <label>{{ actorTypeSetting.name }}</label>
    <div class="form-fields">
      <select v-model="selectedActorValue" :name="name(actorTypeSetting.id, '.')">
          <option 
            v-for="(actorType, index) in actorTypeSetting.options" 
            :key="actorType.value"
            :value="actorType.value"
          >
            {{ actorType.name }}
          </option>
      </select>
    </div>
    <p v-if="showHints" class="notes">{{ actorTypeSetting.hint }}</p>
  </div>

  <div class="form-group">
  <label>{{ dispositionSetting.name }}</label>
  <div class="form-fields">
    <select v-model="selectedDispositionValue" :name="name(dispositionSetting.id, '.')">
        <option 
          v-for="(disposition, index) in dispositionSetting.options" 
          :key="disposition.value"
          :value="disposition.value"
        >
          {{ disposition.name }}
        </option>
    </select>
  </div>
  <p v-if="showHints" class="notes">{{ dispositionSetting.hint }}</p>
  </div>
`;

const template = () => /* html */`
  <nav :class="name('tooltip-editor-header')">
    <span :class="name('tooltip-editor-title')">{{ selectionNames }}</span>
    <div :class="name('tooltip-editor-transfer-buttons-container')">
      <button type="button" :class="name('tooltip-editor-copy-button')" :name="name('tooltip-editor-copy-button')">
        <i class="fas fa-copy" />
        <span>{{ i18n('settings.copy') }}</span>
      </button>
      <button :disabled="clipboard.empty" type="button" :class="name('tooltip-editor-paste-button')" :name="name('tooltip-editor-paste-button')">
        <i class="fas fa-paste" />
        <span>{{ i18n('settings.paste') }}</span>
      </button>
    </div>
  </nav>
  <div :class="name('tooltip-editor-preview-container')">
  </div>
  <div :class="['settings-list', name('tooltip-editor-selection')]">
    ${selectionTemplate()}
  </div>
  <div :class="['settings-list', name('tooltip-editor-settings')]">
  </div>
`;

const config = () => ({
  template: template(),
  setup() {
    const { computed, ref } = Vue;
    const store = Vuex.useStore();

    const moduleName = ref(MODULE_NAME);
    const isUserGM = computed(() => store.getters['TtxStore/isUserGM']);
    const showHints = computed(() => store.getters['TtxStore/showHints']);
    const globalTooltipSettings = computed(() => store.getters['TtxStore/globalTooltipSettings']);
    const ownedTooltipSettings = computed(() => store.getters['TtxStore/ownedTooltipSettings']);
    const clipboard = computed(() => store.getters['TtxStore/clipboard']);

    const name = (originalName, separator = '-') => `${moduleName.value}${separator}${originalName}`;

    const {
      actorTypeSetting,
      selectedActorValue,
      selectedActorName,
      dispositionSetting,
      selectedDispositionValue,
      selectedDispositionName,
      userTypeSettings,
      selectedUserTypeValue,
      selectedUserTypeName,
    } = TtxUseSelectionTooltipEditor(Vue, store);

    const selectionNames = computed(() => `${selectedUserTypeName.value} - ${selectedActorName.value} - ${selectedDispositionName.value}`);

    return {
      moduleName,
      isUserGM,
      showHints,
      name,
      globalTooltipSettings,
      ownedTooltipSettings,

      actorTypeSetting,
      selectedActorValue,

      dispositionSetting,
      selectedDispositionValue,

      userTypeSettings,
      selectedUserTypeValue,

      selectionNames,
      i18n,
      clipboard,
    };
  },
});

const TtxVueTooltipEditor = (id) => {
  const app = Vue.createApp(config());
  const store = TtxStore;

  app.use(store);
  app.mount(id);
};

export default TtxVueTooltipEditor;
