import TtxUeSettingsTooltipEditor from '../composables/TtxUeSettingsTooltipEditor.js';
import TtxUseSelectionTooltipEditor from '../composables/TtxUseSelectionTooltipEditor.js';
import TtxUseTooltipSettings from '../composables/TtxUseTooltipSettings.js';

import { MODULE_NAME, i18n } from '../foundry-integration/TtxFoundryUtils.js';
import { TtxStore } from '../store/TtxStore.js';

const selectionTemplate = /* html */`
  <div v-if="isUserGM" class="form-group">
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

  <div v-if="isUserGM" class="form-group">
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
const generalSettingsTemplate = /* html */ `
  <div 
    class="form-group"
    v-for="generalSetting in generalSettings"
    :key="generalSetting.id"
  >
  <label>{{ generalSetting.name }}</label>
  <div class="form-fields">
    <select 
      v-if="generalSetting.type === 'select'"
      v-model="generalSetting.model.value" 
      :name="name(generalSetting.id, '.')"
      :disabled="generalSetting.disabled"
      @change="generalSetting.onChange"
    >
      <option 
        v-for="(option, index) in generalSetting.options" 
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
    <input 
      v-else-if="generalSetting.type === 'boolean'" 
      type="checkbox" 
      :name="name(generalSetting.id, '.')" 
      :data-dtype="generalSetting.type"
      :checked="generalSetting.value"
      :disabled="generalSetting.disabled"
      @change="generalSetting.onChange($event)"
    />    
    <input 
      v-else-if="generalSetting.type === 'string'" 
      type="text" 
      :name="name(generalSetting.id, '.')" 
      :data-dtype="generalSetting.type"
      :value="generalSetting.value"
      :disabled="generalSetting.disabled"
      @change="generalSetting.onChange($event)"
    />
  </div>
  <p v-if="showHints" class="notes">{{ generalSetting.hint }}</p>
  </div>
`;
const template = /* html */`
  <div :class="[name('tooltip-editor-inner'), tooltipEditorLayoutClass]">
    <nav :class="name('tooltip-editor-header')">
      <span :class="name('tooltip-editor-title')">{{ selectionNames }}</span>
      <div :class="name('tooltip-editor-transfer-buttons-container')">
        <button type="button" :class="name('tooltip-editor-copy-button')" :name="name('tooltip-editor-copy-button')">
          <i class="fas fa-copy" />
          <span v-if="showHints && !tooltipEditorLayout">{{ i18n('settings.copy') }}</span>
        </button>
        <button :disabled="clipboard.empty" type="button" :class="name('tooltip-editor-paste-button')" :name="name('tooltip-editor-paste-button')">
          <i class="fas fa-paste" />
          <span v-if="showHints && !tooltipEditorLayout">{{ i18n('settings.paste') }}</span>
        </button>
        <button 
          type="button" 
          :class="name('tooltip-editor-layout-button')" 
          :name="name('tooltip-editor-layout-button')"
          @click="tooltipEditorLayoutSettings.onChange"
        >
        <i :class="tooltipEditorLayoutIcon" />
        <span v-if="showHints && !tooltipEditorLayout">{{ i18n('settings.layout') }}</span>
      </button>
      </div>
    </nav>
    <div :class="name('tooltip-editor-content')">
      <div :class="name('tooltip-editor-preview-container')">
      </div>
      <div :class="['settings-list', name('tooltip-editor-settings')]">
        ${selectionTemplate}
        ${generalSettingsTemplate}
      </div>
    </div>
  </div>
`;

const config = () => ({
  template,
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
      isGamemasterSelected,
    } = TtxUseSelectionTooltipEditor(Vue, store, { isUserGM });

    const selectionNames = computed(() => `${selectedUserTypeName.value} - ${selectedActorName.value} - ${selectedDispositionName.value}`);
    const selectionValues = computed(() => ({
      selectedUserTypeValue: selectedUserTypeValue.value,
      selectedActorValue: selectedActorValue.value,
      selectedDispositionValue: selectedDispositionValue.value,
    }));

    const {
      currentSettings,
    } = TtxUseTooltipSettings(Vue, store, {
      selectionValues,
      userTypeSettings,
    });

    const {
      tooltipEditorLayout,
      tooltipEditorLayoutSettings,
      tooltipEditorLayoutIcon,
      tooltipEditorLayoutClass,
      generalSettings,
    } = TtxUeSettingsTooltipEditor(
      Vue,
      store,
      {
        isUserGM,
        name,
        selectionValues,
        isGamemasterSelected,
      },
    );

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

      tooltipEditorLayout,
      tooltipEditorLayoutSettings,
      tooltipEditorLayoutIcon,
      tooltipEditorLayoutClass,

      generalSettings,
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
