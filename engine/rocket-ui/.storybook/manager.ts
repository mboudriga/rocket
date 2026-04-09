import { addons, types } from 'storybook/manager-api';
import RocketLight from './RocketLight';

/** Storybook config */
addons.setConfig({
  enableShortcuts: true,
  showToolbar: true,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  navSize: 260,
  bottomPanelHeight: 300,
  rightPanelWidth: 400,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['Components'],
  },

  /** Hide some toolbar options we don't need */
  toolbar: {
    eject: { hidden: true },
    copy: { hidden: true },
    'storybook/background': { hidden: true },
  },

  /** Rocket brand theme (light default — dark mode addon handles toggling) */
  theme: RocketLight,
});

/** Hack to rename panels */
setTimeout(() => {
  const panels = addons.getElements(types.PANEL);

  const controlsPanel = panels['addon-controls'];
  if (controlsPanel) {
    controlsPanel.title = 'Props';
  }

  const actionsPanel = panels['storybook/actions/panel'];
  if (actionsPanel) {
    actionsPanel.title = 'Console';
  }

  const vitestPanel = panels['rocket/vitest/panel'];
  if (vitestPanel) {
    vitestPanel.title = 'Vitest';
  }
}, 100);

/** Override Storybook's Cmd+K to use Rocket component search */
document.addEventListener(
  'keydown',
  (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      e.stopPropagation();
      const iframe = document.querySelector(
        'iframe[title="storybook-preview-iframe"]'
      ) as HTMLIFrameElement;
      iframe?.contentWindow?.postMessage({ type: 'rocket:open-search' }, '*');
    }
  },
  true
);
