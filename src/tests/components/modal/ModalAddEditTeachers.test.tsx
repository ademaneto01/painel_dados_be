import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ModalAddEditTeachers } from '../../../components/modal';

describe('ModalAddEditTeachers', () => {
  const mockOnClose = jest.fn();

  test('renders the component correctly', async () => {
    render(<ModalAddEditTeachers onClose={mockOnClose} modalKey="123" />);

    await screen.findByText('Modal Editar');

    expect(screen.getByLabelText('Ano')).toBeInTheDocument();
    expect(screen.getByLabelText('Material')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Ano'), {
      target: { value: '1 em' },
    });
    fireEvent.change(screen.getByLabelText('Material'), {
      target: { value: '21C COMM level 1' },
    });

    expect((screen.getByLabelText('Ano') as HTMLSelectElement).value).toBe(
      '1 em',
    );
    expect((screen.getByLabelText('Material') as HTMLSelectElement).value).toBe(
      '21C COMM level 1',
    );

    const saveButton = screen.getByText('Salvar');
    fireEvent.click(saveButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('renders an error component when error occurs', async () => {
    render(<ModalAddEditTeachers onClose={mockOnClose} modalKey="invalid" />);
  });
});
