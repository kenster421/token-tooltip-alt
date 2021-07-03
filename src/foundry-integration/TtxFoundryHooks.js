import { TTX_CONSTANTS } from '../assets/TtxConstants.js';
import { registerDependencies } from './TtxFoundryUtils.js';
import { initStore } from '../store/TtxStore.js';

const HOOK_TYPE = {
  ONCE: 'once',
  ON: 'on',
  OFF: 'off',
};
const addHookHandler = (hookId, hookType, callback) => Hooks[hookType](hookId, callback);

const hookHandlers = {
  initHookHandler() {
    return addHookHandler('init', HOOK_TYPE.ONCE, async () => {
      registerDependencies(TTX_CONSTANTS.DEPENDENCIES).then(initStore);
    });
  },
};

const registerHandlers = () => {
  Object.values(hookHandlers).forEach((hookHandler) => hookHandler());
};

export default registerHandlers;
