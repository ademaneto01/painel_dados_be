import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalAddUser } from '../../../components/modal';

describe('ModalAddUser', () => {
  it('renders the component correctly', () => {
    render(<ModalAddUser onCancel={() => {}} />);

    // Assert that the input fields are rendered with initial values
    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirme o E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirme a senha')).toBeInTheDocument();
    expect(screen.getByLabelText('Permissão')).toBeInTheDocument();

    // Assert that the buttons are rendered
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cancelar' }),
    ).toBeInTheDocument();
  });

  it('updates form data on input change', () => {
    render(<ModalAddUser onCancel={() => {}} />);

    // Simulate input change
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Confirme o E-mail'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByLabelText('Confirme a senha'), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByLabelText('Permissão'), {
      target: { value: 'administrator' },
    });

    // Assert that form data is updated
    expect(screen.getByLabelText('Nome')).toHaveValue('John Doe');
    expect(screen.getByLabelText('E-mail')).toHaveValue('john@example.com');
    expect(screen.getByLabelText('Confirme o E-mail')).toHaveValue(
      'john@example.com',
    );
    expect(screen.getByLabelText('Senha')).toHaveValue('password');
    expect(screen.getByLabelText('Confirme a senha')).toHaveValue('password');
    expect(screen.getByLabelText('Permissão')).toHaveValue('administrator');
  });

  it('calls handleSubmit when the "Salvar" button is clicked', () => {
    const handleSubmit = jest.spyOn(console, 'log');
    render(<ModalAddUser onCancel={() => {}} />);

    // Simulate button click
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }));

    // Assert that handleSubmit is called
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('calls onCancel when the "Cancelar" button is clicked', () => {
    const onCancel = jest.fn();
    render(<ModalAddUser onCancel={onCancel} />);

    // Simulate button click
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    // Assert that onCancel is called
    expect(onCancel).toHaveBeenCalled();
  });
});
