import { log, MODULE_NAME } from '../foundry-integration/TtxFoundryUtils.js';
import { TtxStore } from '../store/TtxStore.js';

const template = () => (`
  <div class="settings-list">
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
    const fieldName = (fieldId) => `${moduleName.value}.${fieldId}`;

    log(globalTooltipSettings.value, ownedTooltipSettings.value);

    return {
      moduleName,
      isUserGM,
      fieldName,
      globalTooltipSettings,
      ownedTooltipSettings,
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
