import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';

describe('Accordion', () => {
  const mockToggleAccordion = jest.fn();

  const defaultProps = {
    id: 1,
    title: 'Test Title',
    info: 'Test Info',
    toggleAccordion: mockToggleAccordion,
    isActive: false,
  };

  test('renders the title and info', () => {
    render(<Accordion {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Info')).toBeInTheDocument();
  });

  test('renders the correct button text based on isActive prop', () => {
    const { rerender } = render(
      <Accordion {...defaultProps} isActive={false} />
    );
    expect(screen.getByRole('button')).toHaveTextContent('+');

    rerender(<Accordion {...defaultProps} isActive={true} />);
    expect(screen.getByRole('button')).toHaveTextContent('-');
  });

  test('calls toggleAccordion with the correct id when button is clicked', () => {
    render(<Accordion {...defaultProps} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleAccordion).toHaveBeenCalledWith(1);
  });

  test('applies the correct class based on isActive prop', () => {
    const { rerender } = render(
      <Accordion {...defaultProps} isActive={false} />
    );
    expect(screen.getByText('Test Info').parentElement).not.toHaveClass('open');

    rerender(<Accordion {...defaultProps} isActive={true} />);
    expect(screen.getByText('Test Info').parentElement).toHaveClass('open');
  });
});
