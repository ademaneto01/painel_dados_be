import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import TableTeacherGuidesCard from '../../../../components/actions/lessonsPlansActions/TableTeacherGuidesCard';

jest.mock('react-icons/fi', () => ({
  FiEdit: () => <div data-testid="FiEdit" />,
}));

jest.mock('react-icons/fa', () => ({
  FaTrashAlt: () => <div data-testid="FaTrashAlt" />,
}));

jest.mock(
  '../../../../components/modal/modalAddEditTeachers/ModalAddEditTeachers',
  () => ({
    __esModule: true,
    default: function MockModalAddEditTeachers(props: any) {
      return <div data-testid="ModalAddEditTeachers">{props.modalKey}</div>;
    },
  }),
);

jest.mock('../../../../components/modal/modalDelete/ModalDelete', () => ({
  __esModule: true,
  default: function MockModalDelete(props: any) {
    return (
      <div data-testid="ModalDelete">
        {props.title} - {props.message}
      </div>
    );
  },
}));

describe('TableTeacherGuidesCard', () => {
  it('opens the delete modal on trash icon click', async () => {
    const props = {
      id: 'teacherGuide1',
      titleDeleteTeachers: 'Teacher Guide 1',
    };

    const { getByTestId, queryByTestId } = render(
      <TableTeacherGuidesCard {...props} />,
    );

    expect(queryByTestId('ModalDelete')).toBeNull();

    fireEvent.click(getByTestId('FaTrashAlt'));

    await waitFor(() => {
      expect(queryByTestId('ModalDelete')).toBeInTheDocument();
      expect(queryByTestId('ModalDelete')).toHaveTextContent(
        `Excluir - Realmente deseja excluir ${props.titleDeleteTeachers}?`,
      );
    });
  });
});
