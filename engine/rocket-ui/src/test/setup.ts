import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, expect, vi } from 'vitest';
import type { AxeMatchers } from 'vitest-axe';
import * as matchers from 'vitest-axe/matchers';

// ============================================
// KNOWN JSDOM LIMITATION: user.type() / user.clear() on <input type="number">
// (role="spinbutton") causes infinite loops in jsdom + user-event v14.
// Always use fireEvent.change() for spinbutton inputs instead.
// ============================================

// ============================================
// Suppress jsdom virtual console noise
// jsdom writes "Not implemented" and CSS parse warnings directly to
// process.stderr, bypassing console.* and vitest's onConsoleLog hook.
// ============================================
const SUPPRESSED_STDERR = [
  'Not implemented:',
  'Could not parse CSS stylesheet',
];
const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = ((chunk: string | Uint8Array, ...args: unknown[]) => {
  const str = typeof chunk === 'string' ? chunk : chunk.toString();
  if (SUPPRESSED_STDERR.some((pattern) => str.includes(pattern))) return true;
  return (originalStderrWrite as Function)(chunk, ...args);
}) as typeof process.stderr.write;

// Extend expect with axe matchers
declare module 'vitest' {
  // biome-ignore lint/suspicious/noExplicitAny: vitest Assertion interface requires any
  interface Assertion<T = any> extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
expect.extend(matchers);

// ============================================
// RAF Mock with Proper Cancellation
// ============================================
let rafId = 0;
const pendingRafCallbacks = new Map<number, ReturnType<typeof setTimeout>>();

window.requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
  const id = ++rafId;
  const timerId = setTimeout(() => {
    pendingRafCallbacks.delete(id);
    callback(performance.now());
  }, 16);
  pendingRafCallbacks.set(id, timerId);
  return id;
});

window.cancelAnimationFrame = vi.fn((id: number) => {
  const timerId = pendingRafCallbacks.get(id);
  if (timerId !== undefined) {
    clearTimeout(timerId);
    pendingRafCallbacks.delete(id);
  }
});

// ============================================
// Browser API Mocks
// ============================================

// ResizeObserver - required by Chakra/Ark components
class ResizeObserverMock implements ResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// IntersectionObserver - class mock for Vitest 4 constructor compatibility
class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = '0px';
  readonly scrollMargin = '0px';
  readonly thresholds = [0];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn().mockReturnValue([]);
}
vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

// matchMedia - required for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Scroll methods
Element.prototype.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn() as typeof window.scrollTo;

// getComputedStyle fix
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = (elt: Element, pseudoElt?: string | null) => {
  try {
    return originalGetComputedStyle(elt, pseudoElt);
  } catch {
    return {} as CSSStyleDeclaration;
  }
};

// PointerEvent mock
class MockPointerEvent extends MouseEvent {
  pointerId: number;
  pointerType: string;
  isPrimary: boolean;
  constructor(type: string, props: PointerEventInit = {}) {
    super(type, props);
    this.pointerId = props.pointerId ?? 0;
    this.pointerType = props.pointerType ?? 'mouse';
    this.isPrimary = props.isPrimary ?? true;
  }
}
window.PointerEvent = MockPointerEvent as typeof PointerEvent;

// URL APIs for file handling components
URL.createObjectURL = vi.fn(() => 'blob:mock-url');
URL.revokeObjectURL = vi.fn();

// ============================================
// Cleanup Hooks (ORDER MATTERS!)
// ============================================

afterEach(() => {
  // 1. Flush pending timers first
  try {
    vi.runOnlyPendingTimers();
  } catch {
    // Fake timers not active
  }

  // 2. Cancel all pending RAF callbacks
  for (const timerId of pendingRafCallbacks.values()) {
    clearTimeout(timerId);
  }
  pendingRafCallbacks.clear();
  rafId = 0;

  // 3. React Testing Library cleanup
  cleanup();

  // 4. Clear DOM
  document.body.innerHTML = '';

  // 5. Clear mocks
  vi.clearAllMocks();

  // 6. Restore real timers
  vi.useRealTimers();
});

afterAll(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
  process.stderr.write = originalStderrWrite;
});
