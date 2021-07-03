import { TTX_CONSTANTS } from '../../assets/TtxConstants.js';

export default class TtxSettingsEditor extends FormApplication {
  static get defaultOptions() {
    const { TEMPLATES, APPS } = TTX_CONSTANTS;
    return {
      ...super.defaultOptions,
      ...APPS.DEFAULT_VALUES,
      template: TEMPLATES.SETTINGS_EDITOR,
    };
  }

  activateListeners($html) {
    super.activateListeners($html);
  }
}
