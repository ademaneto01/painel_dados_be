import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TableActionsUnits from '../../../../components/actions/lessonsPlansActions/TableActionsUnits';

jest.mock('react-icons/fa', () => ({
  FaTrashAlt: () => <div data-testid="FaTrashAlt" />,
}));
jest.mock('react-icons/fi', () => ({
  FiEdit: () => <div data-testid="FiEdit" />,
  FiEye: () => <div data-testid="FiEye" />,
}));
jest.mock('react-icons/bi', () => ({
  BiCalendar: () => <div data-testid="BiCalendar" />,
}));

describe('TableActionsUnits', () => {
  it('opens the delete modal on trash icon click', () => {
    const props = {
      id: '1',
      titleDelete: 'Unit',
    };

    const { getByTestId, queryByTestId } = render(
      <TableActionsUnits {...props} />,
    );

    expect(queryByTestId('ModalDelete')).toBeNull();

    fireEvent.click(getByTestId('FaTrashAlt'));

    waitFor(() => expect(getByTestId('ModalDelete')).toBeInTheDocument());
  });
});
