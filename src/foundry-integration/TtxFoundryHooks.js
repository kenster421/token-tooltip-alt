const HOOK_TYPE = {
  ONCE: 'once',
  ON: 'on',
  OFF: 'off',
};
const addHookHandler = (hookId, hookType, callback) => Hooks[hookType](hookId, callback);

const hookHandlers = {
  initHookHandler() {
    return addHookHandler('init', HOOK_TYPE.ONCE, async () => {

    });
  },
};

const registerHandlers = () => {
  Object.values(hookHandlers).forEach((hookHandler) => hookHandler());
};

export default registerHandlers;
