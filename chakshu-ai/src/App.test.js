import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Chakshu.AI title and hero', () => {
  render(<App />);
  const heroHeading = screen.getByText(/Hunting for Exoplanets/i);
  expect(heroHeading).toBeInTheDocument();
});
