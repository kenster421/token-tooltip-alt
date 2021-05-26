import { TTAConstants } from '../TTAConstants/TTAConstants.js';
import { getSetting, setSettingSync } from '../TTAFoundryApiIntegration/Settings/TTASettingsUtils.js';
import {
  clone, debug, generateRandomColor, MODULE_NAME,
} from '../TTAUtils/TTAUtils.js';
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

    state$().subscribe((settings) => {
      debug(settings);
      html.querySelector('#myTest2').innerHTML = Object.values(settings)[Object.values(settings).length - 1];
    });

    fromEvent(html.querySelector('#myTest'), 'click').subscribe((event) => {
      mutate((settings) => {
        settings[event.timeStamp] = event.timeStamp;
        return settings;
      });
    });
  }

  async _updateObject(event, formData) {}
}
