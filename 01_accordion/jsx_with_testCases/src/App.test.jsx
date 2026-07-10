import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { questions } from './data';

describe('App', () => {
  test('renders the checkbox and label', () => {
    render(<App />);

    expect(
      screen.getByLabelText('Allow multiple accordions open?')
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('toggles allowMultipleOpen state when checkbox is clicked', () => {
    render(<App />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('renders all AccordionItem components', () => {
    render(<App />);

    questions.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });

  test('toggles accordion state when an AccordionItem button is clicked', () => {
    render(<App />);

    const firstItemButton = screen.getAllByRole('button')[1]; // First item button
    fireEvent.click(firstItemButton);
    expect(firstItemButton).toHaveTextContent('-');

    fireEvent.click(firstItemButton);
    expect(firstItemButton).toHaveTextContent('+');
  });

  test('does not allow multiple accordions open when checkbox is unchecked', () => {
    render(<App />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    const firstItemButton = screen.getAllByRole('button')[1];
    const secondItemButton = screen.getAllByRole('button')[2];

    fireEvent.click(firstItemButton);
    expect(firstItemButton).toHaveTextContent('-');
    fireEvent.click(secondItemButton);
    expect(firstItemButton).toHaveTextContent('+');
    expect(secondItemButton).toHaveTextContent('-');
  });

  test('allows multiple accordions open when checkbox is checked', () => {
    render(<App />);

    const firstItemButton = screen.getAllByRole('button')[1];
    const secondItemButton = screen.getAllByRole('button')[2];

    fireEvent.click(firstItemButton);
    expect(firstItemButton).toHaveTextContent('-');
    fireEvent.click(secondItemButton);
    expect(firstItemButton).toHaveTextContent('-');
    expect(secondItemButton).toHaveTextContent('-');
  });
});
