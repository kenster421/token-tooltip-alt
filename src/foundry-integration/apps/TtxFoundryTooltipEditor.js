import { TTX_CONSTANTS } from '../../assets/TtxConstants.js';
import { MODULE_NAME } from '../TtxFoundryUtils.js';
import TtxVueTooltipEditor from '../../components/TtxVueTooltipEditor.js';

export default class TtxFoundryTooltipEditor extends FormApplication {
  static get defaultOptions() {
    const { TEMPLATES, APPS } = TTX_CONSTANTS;
    return {
      ...super.defaultOptions,
      ...APPS.DEFAULT_VALUES,
      height: 600,
      width: 860,
      template: TEMPLATES.TOOLTIP_EDITOR,
      id: `${MODULE_NAME}-tooltip-editor-app`,
    };
  }

  // eslint-disable-next-line no-unused-vars
  async getData(options) {
    return { MODULE_NAME };
  }

  activateListeners($html) {
    super.activateListeners($html);

    TtxVueTooltipEditor(`#${MODULE_NAME}-tooltip-editor`);
  }
}
