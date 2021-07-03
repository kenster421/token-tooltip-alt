import { TtxStore } from '../store/TtxStore.js';

const template = () => (`
`);

const config = () => ({
  template: template(),
});

const TtxVueSettingsEditor = (id) => {
  const app = Vue.createApp(config());
  const store = TtxStore;

  app.use(store);
  app.mount(id);
};

export default TtxVueSettingsEditor;
