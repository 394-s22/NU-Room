import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Form from "./Components/Form";
import MatchesPage from "./Components/MatchesPage";

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

  // Testing existing user id in localStorage mock
  // Expected response: PASS
  test('shows the Matches screen if user id exists', async () => {
    global.localStorage.setItem('uid', 'test-id')
    if (expect(global.localStorage.getItem('uid')).toBe("test-id")) {
        render(<Matches />);
        const matchesTitle = await screen.getAllByText('Loading...', {}, { timeout: 3000 })[0];
        expect(matchesTitle).toBeVisible();
    }
  });
  
  // Testing undefined user id in localStorage mock
  // Expected Response: PASS 
  test('shows Form screen if user id does not exist', async () => {
    global.localStorage.clear()
    if (expect(global.localStorage.getItem('uid')).toBe(null)) {
        render(<Form />);
        const formTitle = await screen.getAllByText('Roommate matches will be created based on your responses to this form. It is important that all information is accurate and honest.', {}, { timeout: 3000 })[0];
        expect(formTitle).toBeVisible();
    }
  });
  