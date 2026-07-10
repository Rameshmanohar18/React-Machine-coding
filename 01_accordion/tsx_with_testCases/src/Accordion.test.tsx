import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Accordion from './Accordion';

describe('Accordion Component', () => {
  const mockToggleAccordion = jest.fn();
  const defaultProps = {
    id: 1,
    title: 'Accordion Title',
    info: 'Accordion Info',
    toggleAccordion: mockToggleAccordion,
    isActive: false,
  };

  it('should render the Accordion component', () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByText('Accordion Title')).toBeInTheDocument();
    expect(screen.getByText('Accordion Info')).toBeInTheDocument();
  });

  it('should call toggleAccordion when button is clicked', () => {
    render(<Accordion {...defaultProps} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockToggleAccordion).toHaveBeenCalledWith(1);
  });

  it('should display "+" when accordion is not active', () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByRole('button')).toHaveTextContent('+');
  });

  it('should display "-" when accordion is active', () => {
    render(<Accordion {...defaultProps} isActive={true} />);
    expect(screen.getByRole('button')).toHaveTextContent('-');
  });

  it('should have aria-expanded set to true when accordion is active', () => {
    render(<Accordion {...defaultProps} isActive={true} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('should have aria-expanded set to false when accordion is not active', () => {
    render(<Accordion {...defaultProps} isActive={false} />);
    expect(screen.getByRole('button')).toHaveAttribute(
      'aria-expanded',
      'false'
    );
  });
});
