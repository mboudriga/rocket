export default defineContentScript({
  matches: ['<all_urls>'],
  runAt: 'document_idle',
  main(ctx) {
    const indicator = document.createElement('div');
    indicator.id = 'wxt-starter-indicator';
    indicator.textContent = '\u{1F680}';
    Object.assign(indicator.style, {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      zIndex: '999999',
      fontSize: '24px',
      cursor: 'pointer',
      opacity: '0.5',
      transition: 'opacity 0.2s',
    });
    indicator.addEventListener('mouseenter', () => {
      indicator.style.opacity = '1';
    });
    indicator.addEventListener('mouseleave', () => {
      indicator.style.opacity = '0.5';
    });
    document.body.appendChild(indicator);

    ctx.onInvalidated(() => {
      indicator.remove();
    });
  },
});
