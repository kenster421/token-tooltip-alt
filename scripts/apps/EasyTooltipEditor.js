import { TTAConstants } from '../TTAConstants/TTAConstants.js';
import { debug } from '../TTAUtils/TTAUtils.js';
import { state$, mutate } from '../TTAFoundryApiIntegration/Settings/TTAStore.js';

export default class EasyTooltipEditor extends FormApplication {
  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      template: TTAConstants.APPS.EASY_TOOLTIP_EDITOR,
      width: TTAConstants.APPS.TOOLTIP_EDITOR_WIDTH,
      resizable: true,
      submitOnChange: false,
      closeOnSubmit: false,
      submitOnClose: false,
    };
  }

  // returns the data used by the tooltip-editor.hbs template
  getData(options) {
    return {};
  }

  // add button events for the ones generated when the application is opened
  activateListeners($html) {
    super.activateListeners($html);
    const html = $html[0];
    const { fromEvent } = rxjs;

    state$(TTAConstants.SETTING_KEYS.OWNED_SETTINGS).subscribe((settings) => {
      debug(settings);
      html.querySelector('#myTest2').innerHTML = Object.values(settings)[Object.values(settings).length - 1];
    });

    fromEvent(html.querySelector('#myTest'), 'click').subscribe((event) => {
      mutate((settings) => {
        settings[event.timeStamp] = event.timeStamp;
        return settings;
      }, TTAConstants.SETTING_KEYS.OWNED_SETTINGS);
    });
  }

  async _updateObject(event, formData) {}
}
