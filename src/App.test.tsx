import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    expect(getByText('Load Graph Elements')).toBeInTheDocument();
  });
});


describe('App Interaction', () => {
  it('handles button click correctly', () => {
    const { getByText } = render(<App />);
    const button = getByText('Load Graph Elements');
    fireEvent.click(button);
    expect(button).toBeDisabled();  // Check if the button gets disabled
  });
});