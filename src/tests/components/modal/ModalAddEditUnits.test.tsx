import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ModalAddEditUnits } from '../../../components/modal';

describe('ModalAddEditUnits', () => {
  const mockOnCancel = jest.fn();

  test('renders the component correctly', async () => {
    render(<ModalAddEditUnits onCancel={mockOnCancel} unitsKey="123" />);

    // Wait for the component to load
    await screen.findByText('Novo Plano de Aula');

    // Assert that the input fields are rendered with initial values
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Test Class' },
    });
    fireEvent.change(screen.getByLabelText('Content'), {
      target: { value: 'Test Content' },
    });

    // Assert that the input values are updated
    expect((screen.getByLabelText('Nome') as HTMLInputElement).value).toBe(
      'Test Class',
    );
    expect((screen.getByLabelText('Content') as HTMLInputElement).value).toBe(
      'Test Content',
    );

    // Trigger the save button click
    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    // Assert that the handleSubmit function is called
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
