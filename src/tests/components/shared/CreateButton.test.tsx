import { render, screen, fireEvent } from '@testing-library/react';
import CreateButton from '@/components/shared/CreateButton';

test('should render CreateButton with text and fire onClick event', () => {
  const onClickMock = jest.fn();

  render(
    <CreateButton
      text="Test Button"
      onClick={onClickMock}
      color="red"
      colorBackGround="white"
    />,
  );

  expect(screen.getByText('Test Button')).toBeInTheDocument();

  const buttonElement = screen.getByTestId('action');
  expect(buttonElement);

  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});

test('should render CreateButton with icon and fire onClick event', () => {
  const onClickMock = jest.fn();

  render(
    <CreateButton
      icon={<span>Icon</span>}
      onClick={onClickMock}
      color="blue"
      colorBackGround="yellow"
    />,
  );

  expect(screen.getByText('Icon')).toBeInTheDocument();

  const buttonElement = screen.getByText('Icon');
  expect(buttonElement);

  fireEvent.click(buttonElement);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
