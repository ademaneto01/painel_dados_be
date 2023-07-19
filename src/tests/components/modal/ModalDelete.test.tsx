import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { ModalDelete } from '../../../components/modal';

describe('ModalDelete', () => {
  it('calls onCancel when the "Não" button is clicked', () => {
    const onCancel = jest.fn();
    render(
      <ModalDelete
        title="Confirmation"
        message="Are you sure you want to delete this item?"
        onCancel={onCancel}
      />,
    );

    // Simulate button click
    fireEvent.click(screen.getByRole('button', { name: 'Não' }));

    // Assert that onCancel is called
    expect(onCancel).toHaveBeenCalled();
  });
});
