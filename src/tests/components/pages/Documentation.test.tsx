import { render, screen } from '@testing-library/react';
import Documentation from '../../../components/pages/Documentation';

describe('Documentation component', () => {
  test('should render the component', () => {
    render(<Documentation />);

    expect(screen.getByText('Documentação')).toBeInTheDocument();
    expect(screen.getByText('Novo recurso')).toBeInTheDocument();
  });
});
