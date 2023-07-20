import { render, screen } from '@testing-library/react';
import Schools from '../../../components/pages/Schools';

test('should render elements', () => {
  render(<Schools />);
  expect(screen.getByText('Escolas')).toBeInTheDocument();
  expect(screen.getByText('Nova escola')).toBeInTheDocument();
});
