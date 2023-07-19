import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { ModalLessons } from '../../../components/modal';

jest.mock('../../../backendApi', () => ({
  getLessons: jest.fn().mockResolvedValue([
    {
      id: 'example',
      nome: 'Example Lesson',
      arquivo: 'example.jpg',
      descricao: 'Example Description',
    },
  ]),
}));

jest.mock('../../../components/base64', () => ({
  base64: jest.fn().mockResolvedValue('mocked-base64-string'),
}));

describe('ModalLessons', () => {
  it('calls handleSave when the "Salvar" button is clicked', async () => {
    const onClose = jest.fn();

    render(<ModalLessons onClose={onClose} modalKey="example" />);

    // Wait for the form data to be loaded
    await waitFor(() => {
      expect(screen.getByLabelText('Nome')).toHaveValue('Example Lesson');
      expect(screen.getByLabelText('Descrição')).toHaveValue(
        'Example Description',
      );
    });

    // Simulate input change
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Updated Lesson' },
    });

    // Simulate file change
    const file = new File(['file contents'], 'example.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(screen.getByLabelText('Upload'), {
      target: { files: [file] },
    });

    // Wait for the image to load
    await waitFor(() => {
      expect(screen.getByAltText('Uploaded')).toBeInTheDocument();
    });

    // Trigger click event on the "Salvar" button
  });
});
