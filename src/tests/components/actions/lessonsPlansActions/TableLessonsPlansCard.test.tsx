import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TableLessonsPlansCard from '../../../../components/actions/lessonsPlansActions/TableLessonsPlansCard';

jest.mock('react-icons/fa', () => ({
  FaTrashAlt: () => <div data-testid="FaTrashAlt" />,
}));

describe('TableLessonsPlansCard', () => {
  it('opens the delete modal on trash icon click', async () => {
    const props = {
      id: '1',
      titleDelete: 'Lesson Plan',
    };

    const { getByTestId, queryByText } = render(
      <TableLessonsPlansCard {...props} />,
    );

    expect(queryByText('Excluir')).toBeNull();

    fireEvent.click(getByTestId('FaTrashAlt'));

    await waitFor(() => {
      expect(queryByText('Excluir')).toBeInTheDocument();
      expect(
        queryByText(`Realmente deseja excluir ${props.titleDelete}?`),
      ).toBeInTheDocument();
    });
  });
});
