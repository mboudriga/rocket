export default defineBackground(() => {
  browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
      id: CONTEXT_MENU_ID,
      title: 'Search "%s"',
      contexts: ['selection'],
    });
  });

  browser.contextMenus.onClicked.addListener((info) => {
    if (info.menuItemId === CONTEXT_MENU_ID && info.selectionText) {
      browser.tabs.create({
        url: `https://www.google.com/search?q=${encodeURIComponent(info.selectionText)}`,
      });
    }
  });

  counterStorage.watch((newValue: number | null) => {
    browser.action.setBadgeText({ text: newValue && newValue > 0 ? String(newValue) : '' });
    browser.action.setBadgeBackgroundColor({ color: '#6366f1' });
  });

  browser.alarms.create(ALARM_NAME, {
    delayInMinutes: 1,
    periodInMinutes: ALARM_INTERVAL_MINUTES,
  });

  browser.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
      console.info('[background] Periodic alarm fired');
    }
  });

  console.info('[background] Service worker initialized');
});
