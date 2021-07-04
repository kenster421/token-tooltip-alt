import { TTX_CONSTANTS } from '../../assets/TtxConstants.js';
import { MODULE_NAME } from '../TtxFoundryUtils.js';
import TtxVueSettingsEditor from '../../components/TtxVueSettingsEditor.js';

export default class TtxFoundrySettingsEditor extends FormApplication {
  static get defaultOptions() {
    const { TEMPLATES, APPS } = TTX_CONSTANTS;
    return {
      ...super.defaultOptions,
      ...APPS.DEFAULT_VALUES,
      width: 535,
      resizable: false,
      template: TEMPLATES.SETTINGS_EDITOR,
    };
  }

  // eslint-disable-next-line no-unused-vars
  async getData(options) {
    return { MODULE_NAME };
  }

  activateListeners($html) {
    super.activateListeners($html);

    TtxVueSettingsEditor(`#${MODULE_NAME}-settings-editor`);
  }
}
