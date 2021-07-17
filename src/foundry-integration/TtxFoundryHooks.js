import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { migrateToTheLatestVersion } from './migration/TtxFoundryMigration.js';
import { registerDependencies } from './TtxFoundryUtils.js';
import { initStore } from '../store/TtxStore.js';
import { initSettings } from './TtxFoundrySettings.js';
import TtxFoundryTooltipEditor from './apps/TtxFoundryTooltipEditor.js';

const HOOK_TYPE = {
  ONCE: 'once',
  ON: 'on',
  OFF: 'off',
};
const addHookHandler = (hookId, hookType, callback) => Hooks[hookType](hookId, callback);

const hookHandlers = {
  initHookHandler() {
    return addHookHandler('init', HOOK_TYPE.ONCE, initSettings);
  },
  readyHookHandler() {
    return addHookHandler(
      'ready',
      HOOK_TYPE.ONCE,
      () => migrateToTheLatestVersion(
        () => registerDependencies(TTX_CONSTANTS.DEPENDENCIES).then(() => {
          initStore();
          // TODO: REMOVE
          new TtxFoundryTooltipEditor().render(true);
          // CONFIG.debug.hooks = true;
        }),
      ),
    );
  },
};

const registerHandlers = () => {
  Object.values(hookHandlers).forEach((hookHandler) => hookHandler());
};

export default registerHandlers;
