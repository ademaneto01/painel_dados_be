import { render, screen } from '@testing-library/react';
import SideNavBarButton from '../../../components/sideNavBar/SideNavBarButton';

test('should render SideNavBarButton as active when active prop is true', () => {
  const text = 'Button Text';
  const icon = <svg>Icon</svg>;

  render(
    <SideNavBarButton
      text={text}
      icon={icon}
      onClick={jest.fn()}
      active={true}
      hidden={false}
    />,
  );

  const buttonElement = screen.getByTestId('side-nav-button');
  expect(buttonElement);
});
