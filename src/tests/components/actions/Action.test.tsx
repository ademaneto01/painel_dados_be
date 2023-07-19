import { fireEvent, render, screen } from '@testing-library/react';
import { Action } from '../../../components/actions';
import { FiEdit } from 'react-icons/fi';

describe('Action component', () => {
  test('should call onClick function when clicked', () => {
    const onClickMock = jest.fn();
    render(<Action onClick={onClickMock} icon={<FiEdit />} />);

    const actionElement = screen.getByTestId('action');
    fireEvent.click(actionElement);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
