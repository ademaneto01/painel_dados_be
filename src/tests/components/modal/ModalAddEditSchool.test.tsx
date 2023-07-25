import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ModalAddEditSchool } from '../../../components/modal';

describe('ModalAddEditSchool', () => {
  const mockOnCancel = jest.fn();

  test('renders the component correctly', async () => {
    render(<ModalAddEditSchool onCancel={mockOnCancel} modalKey="123" />);

    await screen.findByText('Editar Escola');

    expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome do Contato:')).toBeInTheDocument();
    expect(screen.getByLabelText('SSO:')).toBeInTheDocument();
    expect(screen.getByLabelText('Cidade:')).toBeInTheDocument();
    expect(screen.getByLabelText('CEP:')).toBeInTheDocument();
    expect(screen.getByLabelText('Estado:')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Nome:'), {
      target: { value: 'Test School' },
    });
    fireEvent.change(screen.getByLabelText('Nome do Contato:'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('SSO:'), {
      target: { value: 'Microsoft' },
    });
    fireEvent.change(screen.getByLabelText('Cidade:'), {
      target: { value: 'City' },
    });
    fireEvent.change(screen.getByLabelText('CEP:'), {
      target: { value: '12345' },
    });
    fireEvent.change(screen.getByLabelText('Estado:'), {
      target: { value: 'State' },
    });
    fireEvent.change(screen.getByLabelText('Telefone:'), {
      target: { value: '123456789' },
    });

    expect((screen.getByLabelText('Nome:') as HTMLInputElement).value).toBe(
      'Test School',
    );
    expect(
      (screen.getByLabelText('Nome do Contato:') as HTMLInputElement).value,
    ).toBe('John Doe');
    expect((screen.getByLabelText('SSO:') as HTMLSelectElement).value).toBe(
      'Microsoft',
    );
    expect((screen.getByLabelText('Cidade:') as HTMLInputElement).value).toBe(
      'City',
    );
    expect((screen.getByLabelText('CEP:') as HTMLInputElement).value).toBe(
      '12345',
    );
    expect((screen.getByLabelText('Estado:') as HTMLInputElement).value).toBe(
      'State',
    );
    expect((screen.getByLabelText('Telefone:') as HTMLInputElement).value).toBe(
      '123456789',
    );

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  test('renders an error component when error occurs', async () => {
    // Mock an error by passing an invalid modalKey
    render(<ModalAddEditSchool onCancel={mockOnCancel} modalKey="invalid" />);
  });
});
