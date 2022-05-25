import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
  global.localStorage = new LocalStorageMock;

  test('shows the Loading screen if user id exists', async () => {
    global.localStorage.setItem('uid', 'test-id')
    render(<App />);
    if (expect(global.localStorage.getItem('uid')).toBe("test-id")) {
        const title = await screen.getAllByText('Loading...', {}, { timeout: 3000 })[0];
        expect(title).toBeVisible();
    }
  });

  