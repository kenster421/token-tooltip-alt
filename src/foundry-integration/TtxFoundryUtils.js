const OLD_MODULE_NAME = 'token-tooltip-alt';
const MODULE_NAME = 'token-tooltip-next';
const MODULE_TITLE = 'Token Tooltip Next';
const MODULE_VERSION = '4.0.0';

const CONSOLE_COLORS = ['background: #222; color: #bada55', 'color: #fff'];
const DEBUG = true;

const consoleOutput = (output) => [`%c${MODULE_TITLE} (㇏(•̀ᵥᵥ•́)ノ) %c|`, ...CONSOLE_COLORS, ...output];
const consoleTrace = (output) => {
  console.groupCollapsed(...consoleOutput(output));
  console.trace();
  console.groupEnd();
};
const log = (...output) => DEBUG && consoleTrace(output);

const clone = (obj) => JSON.parse(JSON.stringify(obj || null));
const i18n = (path) => game.i18n.localize(`${MODULE_NAME}.${path}`);
const generateRandomColor = () => `#${Math.round((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`;
const htmlToElement = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};
const registerDependencies = async (dependencies = []) => {
  dependencies.forEach((dependency) => {
    const { name, options } = dependency;
    Dlopen.register?.(name, options);
  });

  return Dlopen.loadDependencies?.(dependencies.map((dependency) => dependency.name));
};

const debounce = (fn, timeout = 300) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      log('Debounced function called');

      return fn(...args);
    }, timeout);
  };
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const orderedDispositionsList = () => Object
  .entries(CONST?.TOKEN_DISPOSITIONS || {})
  .sort((d1, d2) => (d2[1] - d1[1]))
  .map((d) => d[0].toLowerCase?.());

export {
  OLD_MODULE_NAME,
  MODULE_NAME,
  MODULE_TITLE,
  MODULE_VERSION,
  log,
  clone,
  i18n,
  generateRandomColor,
  htmlToElement,
  registerDependencies,
  debounce,
  capitalize,
  orderedDispositionsList,
};
