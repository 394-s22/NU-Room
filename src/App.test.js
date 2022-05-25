import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('shows the NU Room Title', () => {
  render(<App />);
  const title = screen.getByText('NU Room');
  expect(title).toBeInTheDocument();
});