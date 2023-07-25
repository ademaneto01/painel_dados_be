import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ModalAddEditUnits } from '../../../components/modal';

describe('ModalAddEditUnits', () => {
  const mockOnCancel = jest.fn();

  test('renders the component correctly', async () => {
    render(<ModalAddEditUnits onCancel={mockOnCancel} unitsKey="123" />);

    await screen.findByText('Novo Plano de Aula');

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Content')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Test Class' },
    });
    fireEvent.change(screen.getByLabelText('Content'), {
      target: { value: 'Test Content' },
    });

    expect((screen.getByLabelText('Nome') as HTMLInputElement).value).toBe(
      'Test Class',
    );
    expect((screen.getByLabelText('Content') as HTMLInputElement).value).toBe(
      'Test Content',
    );

    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
