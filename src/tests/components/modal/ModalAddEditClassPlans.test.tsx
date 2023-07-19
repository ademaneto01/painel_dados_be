import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ModalAddEditClassPlan } from '../../../components/modal';

describe('ModalAddEditClassPlan', () => {
  const mockOnCancel = jest.fn();

  test('renders the component correctly', async () => {
    render(<ModalAddEditClassPlan onCancel={mockOnCancel} modalKey="123" />);

    await screen.findByText('Editar Class Plans');

    const inputElement = screen.getByLabelText('Nome:') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe('');

    fireEvent.change(inputElement, { target: { value: 'Test Class Plan' } });

    expect(inputElement.value).toBe('Test Class Plan');

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('renders an error component when error occurs', async () => {
    render(
      <ModalAddEditClassPlan onCancel={mockOnCancel} modalKey="invalid" />,
    );
  });
});
