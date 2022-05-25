import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useData } from './utilities/firebase.js';
import App from './App';

test('shows the Loading screen', async () => {
  render(<App />);
  const title = await screen.getAllByText('Loading...', {}, { timeout: 3000 })[0];
  expect(title).toBeVisible();
});
