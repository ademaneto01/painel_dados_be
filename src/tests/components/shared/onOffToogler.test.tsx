import { render, screen, fireEvent } from '@testing-library/react';
import OnOffToggler from '../../../components/shared/onOffToogler';

test('should render OnOffToggler with initial active state and toggle on click', () => {
  render(<OnOffToggler active={true} />);

  expect(screen.getByText('On')).toBeInTheDocument();

  expect(screen.getByText('Off')).toBeInTheDocument();

  const containerElement = screen.getByTestId('on-off-toggler-container');
  expect(containerElement).toHaveTextContent('On');

  fireEvent.click(containerElement);

  expect(containerElement).toHaveTextContent('Off');
});

test('should render OnOffToggler with initial inactive state and toggle on click', () => {
  render(<OnOffToggler active={false} />);

  expect(screen.getByText('On')).toBeInTheDocument();

  expect(screen.getByText('Off')).toBeInTheDocument();

  const containerElement = screen.getByTestId('on-off-toggler-container');
  expect(containerElement).toHaveTextContent('Off');

  fireEvent.click(containerElement);

  expect(containerElement).toHaveTextContent('On');
});
