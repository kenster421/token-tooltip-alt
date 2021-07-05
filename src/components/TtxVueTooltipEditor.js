import TtxUseGeneralTooltipEditor from '../composables/TtxUseGeneralTooltipEditor.js';
import { MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';
import { TtxStore } from '../store/TtxStore.js';

const template = () => (`
  <h1>{{ selectedUserTypeName }} - {{ selectedActorName }} - {{ selectedDispositionName }}</h1>
  <div :class="name('tooltip-preview-container')">
  </div>
  <div :class="['settings-list', name('tooltip-settings')]">

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
    <p class="notes">{{ userTypeSettings.hint }}</p>
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
        <p class="notes">{{ actorTypeSetting.hint }}</p>
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
      <p class="notes">{{ dispositionSetting.hint }}</p>
    </div>

  </div>
`);

const config = () => ({
  template: template(),
  setup() {
    const { computed, ref } = Vue;
    const store = Vuex.useStore();

    const moduleName = ref(MODULE_NAME);
    const isUserGM = computed(() => store.getters['TtxStore/isUserGM']);
    const globalTooltipSettings = computed(() => store.getters['TtxStore/globalTooltipSettings']);
    const ownedTooltipSettings = computed(() => store.getters['TtxStore/ownedTooltipSettings']);

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
    } = TtxUseGeneralTooltipEditor(Vue, store);

    return {
      moduleName,
      isUserGM,
      name,
      globalTooltipSettings,
      ownedTooltipSettings,

      actorTypeSetting,
      selectedActorValue,
      selectedActorName,

      dispositionSetting,
      selectedDispositionValue,
      selectedDispositionName,

      userTypeSettings,
      selectedUserTypeValue,
      selectedUserTypeName,
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
