import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders react logo', () => {
  render(<App />);
  const imageElement = document.querySelector('img');
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('alt','logo');
  expect(imageElement).toHaveAttribute('class','App-logo');
});

test('renders Header section', () => {
  render(<App />);
  const imageElement = document.querySelector('header');
  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('class','App-header');
});
