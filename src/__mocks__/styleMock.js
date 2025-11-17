// CSS module mock for tests
export default {};

// Handle CSS imports
const mockCSS = new Proxy({}, {
  get: (target, prop) => {
    return prop;
  }
});

export { mockCSS };