import TtxUseGeneralTooltipEditor from '../composables/TtxUseGeneralTooltipEditor.js';
import { MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';
import { TtxStore } from '../store/TtxStore.js';

const template = () => (`
  <div :class="name('tooltip-preview-container')">
  </div>
  <div :class="['settings-list', name('tooltip-settings')]">
    <div class="form-group">
      <label>{{ actorTypeSetting.name }}</label>
        <div class="form-fields">
          <select v-model="selectedActorType" :name="name(actorTypeSetting.id, '.')">
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

    const { actorTypeSetting, selectedActorType } = TtxUseGeneralTooltipEditor(Vue, store);

    return {
      moduleName,
      isUserGM,
      name,
      globalTooltipSettings,
      ownedTooltipSettings,
      actorTypeSetting,
      selectedActorType,
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
