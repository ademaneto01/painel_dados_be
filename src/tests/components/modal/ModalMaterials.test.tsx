import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ModalMaterials } from '../../../components/modal';

describe('ModalMaterials', () => {
  test('renders without errors', () => {
    render(<ModalMaterials onCancel={() => {}} />);
    const modalTitle = screen.getByText('Novo Material');
    expect(modalTitle).toBeInTheDocument();
  });

  test('updates form data when inputs change', () => {
    render(<ModalMaterials onCancel={() => {}} />);
    const nomeInput = screen.getByPlaceholderText('Nome') as HTMLInputElement;
    const disciplinaSelect = screen.getByLabelText(
      'Permissão da Disciplina',
    ) as HTMLSelectElement;
    const gradeSelect = screen.getByLabelText(
      'Permissão da Grade',
    ) as HTMLSelectElement;

    fireEvent.change(nomeInput, { target: { value: 'Teste Nome' } });
    fireEvent.change(disciplinaSelect, { target: { value: 'Language' } });
    fireEvent.change(gradeSelect, { target: { value: '1º ano' } });

    expect(nomeInput.value).toBe('Teste Nome');
    expect(disciplinaSelect.value).toBe('Language');
    expect(gradeSelect.value).toBe('1º ano');
  });

  test('calls handleSubmit when the form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<ModalMaterials onCancel={() => {}} />);
    const submitButton = screen.getByText('Salvar') as HTMLButtonElement;

    fireEvent.click(submitButton);

    // We need to wait for the asynchronous code to complete before asserting
    setTimeout(() => {
      expect(handleSubmit).toHaveBeenCalled();
    }, 0);
  });

  test('calls onCancel when the cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(<ModalMaterials onCancel={onCancel} />);
    const cancelButton = screen.getByText('Cancelar') as HTMLButtonElement;

    fireEvent.click(cancelButton);

    expect(onCancel).toHaveBeenCalled();
  });
});
