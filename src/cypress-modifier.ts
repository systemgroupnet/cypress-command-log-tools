/// <reference types='Cypress' />

const getHead = () => Cypress.$(parent.window.document.head);
const getBody = () => Cypress.$(parent.window.document.body);
const getBodyPlugin = () => getBody().find('#app .container .runnable-header');
const stlyeId = 'sg-cypress-style';
const pluginId = 'sg-cypress-plugin';

type CssRules = {
  [key: string]: {
    css: string;
    enable: boolean;
  };
};

type SetupConfiguration = {
  disableHoverOnCommandLogs?: boolean;
};

const cssRules: CssRules = {
  commandHover: {
    css: '.reporter .command { pointer-events: none; }',
    enable: true,
  },
  hideAsserts: {
    css: '.command-name-assert { display: none }',
    enable: true,
  },
  hideXhr: {
    css: '.command-name-xhr { display: none }',
    enable: true,
  },
  hideNewUrl: {
    css: '.command-name-new-url { display: none }',
    enable: true,
  },
  hideErrorFrame: {
    css: '.test-err-code-frame { display: none }',
    enable: true,
  },
  main: {
    css: `.${pluginId} {display: flex; column-gap: 2px; padding: 5px};`,
    enable: true,
  },
};

const constructStyle = () => {
  const content = Object.keys(cssRules)
    .map(k => cssRules[k])
    .reduce<string>((acc, cur) => (cur.enable ? `${acc} ${cur.css}` : acc), '');

  const wrapper = `<style id="${stlyeId}">${content}</style>`;
  return wrapper;
};

const removeStyle = () => {
  getHead().find(`#${stlyeId}`).remove();
};

const appendStyle = () => {
  const style = constructStyle();
  getHead().append(style);
};

const updateStyle = () => {
  removeStyle();
  appendStyle();
};

const removePlugin = () => {
  getBodyPlugin().find(`.${pluginId}`).remove();
};

const appendPlugin = () => {
  const doc = parent.window.document;
  const container = doc.createElement('div');
  container.classList.add(pluginId);
  const addCheckbox = (name: string, id: string) => {
    const ch = parent.window.document.createElement('input');
    ch.type = 'checkbox';
    ch.id = id;
    ch.name = id;
    container.append(ch);
    const label = doc.createElement('label');
    label.htmlFor = id;
    label.innerText = name;
    container.append(label);
  };
  addCheckbox('Show Asserts', 'sg-opt-assert');
  addCheckbox('Show XHR', 'sg-opt-xhr');
  addCheckbox('Show New Urls', 'sg-opt-newurl');
  addCheckbox('Show Error Frame', 'sg-opt-error-frame');
  getBodyPlugin().prepend(container);
};

const updatePlugin = () => {
  removePlugin();
  appendPlugin();
};

export const setupDashboard = (params: SetupConfiguration): void => {
  const { disableHoverOnCommandLogs } = params;
  if (disableHoverOnCommandLogs) {
    cssRules['commandHover'].enable = !disableHoverOnCommandLogs;
  }
  updateStyle();

  void Cypress.$.when(Cypress.$.ready).then(function () {
    updatePlugin();
    getBody()
      .find('#sg-opt-assert')
      .on('click', e => {
        cssRules['hideAsserts'].enable = !(e.target as HTMLInputElement)
          .checked;
        updateStyle();
      });
    getBody()
      .find('#sg-opt-xhr')
      .on('click', e => {
        cssRules['hideXhr'].enable = !(e.target as HTMLInputElement).checked;
        updateStyle();
      });
    getBody()
      .find('#sg-opt-newurl')
      .on('click', e => {
        cssRules['hideNewUrl'].enable = !(e.target as HTMLInputElement).checked;
        updateStyle();
      });
    getBody()
      .find('#sg-opt-error-frame')
      .on('click', e => {
        cssRules['hideErrorFrame'].enable = !(e.target as HTMLInputElement)
          .checked;
        updateStyle();
      });
  });
};
