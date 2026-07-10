import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import data from './data';

describe('App Component', () => {
  it('should render the App component with accordions', () => {
    render(<App />);
    data.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  it('should toggle accordion open and close', () => {
    render(<App />);
    const firstAccordionButton = screen.getAllByRole('button')[0];
    fireEvent.click(firstAccordionButton);
    expect(firstAccordionButton).toHaveTextContent('-');
    fireEvent.click(firstAccordionButton);
    expect(firstAccordionButton).toHaveTextContent('+');
  });

  it('should allow only one accordion open at a time when checkbox is unchecked', () => {
    render(<App />);
    const checkbox = screen.getByLabelText(/allow multiple accordions open/i);
    fireEvent.click(checkbox);

    const firstAccordionButton = screen.getAllByRole('button')[0];
    const secondAccordionButton = screen.getAllByRole('button')[1];

    fireEvent.click(firstAccordionButton);
    fireEvent.click(secondAccordionButton);

    expect(firstAccordionButton).toHaveTextContent('+');
    expect(secondAccordionButton).toHaveTextContent('-');
  });

  it('should allow multiple accordions open when checkbox is checked', () => {
    render(<App />);
    const checkbox = screen.getByLabelText(/allow multiple accordions open/i);

    const firstAccordionButton = screen.getAllByRole('button')[0];
    const secondAccordionButton = screen.getAllByRole('button')[1];

    fireEvent.click(firstAccordionButton);
    fireEvent.click(secondAccordionButton);

    expect(firstAccordionButton).toHaveTextContent('-');
    expect(secondAccordionButton).toHaveTextContent('-');
  });

  it('should toggle the allowMultipleOpen state when checkbox is clicked', () => {
    render(<App />);
    const checkbox = screen.getByLabelText(/allow multiple accordions open/i);
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
