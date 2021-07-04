import { TtxStore } from '../store/TtxStore.js';

const template = () => (`
  <div class="settings-list">
  </div>
`);

const config = () => ({
  template: template(),
  setup() {
    return { };
  },
});

const TtxVueTooltipEditor = (id) => {
  const app = Vue.createApp(config());
  const store = TtxStore;

  app.use(store);
  app.mount(id);
};

export default TtxVueTooltipEditor;
