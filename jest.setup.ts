import "@testing-library/jest-dom";
import { configure } from "@testing-library/dom";

class LocalStorageMock {
  store: Record<string, string>;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value;
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

Object.defineProperty(window, "localStorage", {
  value: new LocalStorageMock(),
});

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: matchingMediaQueries.includes(query),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
});

window.HTMLElement.prototype.scrollIntoView = jest.fn();

const matchingMediaQueries: string[] = [];

Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

configure({
  getElementError: (message) => {
    const error = new Error(message ?? undefined);
    error.name = "TestingLibraryElementError";
    error.stack = undefined;
    return error;
  },
});
