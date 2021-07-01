const MODULE_NAME = 'token-tooltip-next';
const MODULE_TITLE = 'Token Tooltip Next';
const CONSOLE_COLORS = ['background: #222; color: #bada55', 'color: #fff'];
const DEBUG = true;

const consoleOutput = (output) => [`%c${MODULE_TITLE} (㇏(•̀ᵥᵥ•́)ノ) %c|`, ...CONSOLE_COLORS, ...output];
const consoleTrace = (output) => {
  console.groupCollapsed(...consoleOutput(output));
  console.trace();
  console.groupEnd();
};
const log = (...output) => DEBUG ?? consoleTrace(output);

const clone = (obj) => JSON.parse(JSON.stringify(obj || null));
const i18n = (path) => game.i18n.localize(`${MODULE_NAME}.${path}`);
const generateRandomColor = () => `#${Math.round((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0')}`;
const htmlToElement = (html) => {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstChild;
};
const registerDependencies = async (dependencies) => {
  if (!Array.isArray(dependencies) || !Dlopen) return;

  dependencies.forEach((dependency) => {
    const { name, options } = dependency;
    Dlopen.register?.(name, options);
  });

  Dlopen.loadDependencies?.(dependencies.map((dependency) => dependency.name));
};

export {
  MODULE_NAME,
  MODULE_TITLE,
  log,
  clone,
  i18n,
  generateRandomColor,
  htmlToElement,
  registerDependencies,
};
