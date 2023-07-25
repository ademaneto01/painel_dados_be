import { render, fireEvent, waitFor } from '@testing-library/react';
import { TableActionsSchool } from '../../../components/actions';

jest.mock('react-icons/fa', () => ({
  FaTrashAlt: () => <div data-testid="FaTrashAlt" />,
}));

jest.mock('react-icons/fi', () => ({
  FiEdit: () => <div data-testid="FiEdit" />,
}));

jest.mock(
  '../../../components/modal/modalAddEditSchool/ModalAddEditSchool',
  () => ({
    __esModule: true,
    default: function ModalAddEditSchool(props: any) {
      return <div data-testid="ModalAddEditSchool">{props.modalKey}</div>;
    },
  }),
);

describe('TableActionsSchool', () => {
  it('opens the delete modal on trash icon click', () => {
    const props = {
      id: '1',
      titleDelete: 'Unit',
    };

    const { getByTestId, queryByTestId } = render(
      <TableActionsSchool {...props} />,
    );

    expect(queryByTestId('ModalDelete')).toBeNull();

    fireEvent.click(getByTestId('FaTrashAlt'));

    waitFor(() => expect(getByTestId('ModalDelete')).toBeInTheDocument());
  });

  it('opens the edit modal on edit icon click', () => {
    const props = {
      id: '1',
    };

    const { getByTestId, queryByTestId } = render(
      <TableActionsSchool {...props} />,
    );

    expect(queryByTestId('ModalAddEditSchool')).toBeNull();

    fireEvent.click(getByTestId('FiEdit'));

    waitFor(() =>
      expect(getByTestId('ModalAddEditSchool')).toBeInTheDocument(),
    );
  });
});
