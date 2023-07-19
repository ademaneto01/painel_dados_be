import { render } from '@testing-library/react';
import { TableActionsClassPlan } from '../../../components/actions';

test('should render ok', () => {
  const mockId = '123';
  const mockTitleDelete = 'Class Plan 1';

  render(<TableActionsClassPlan id={mockId} titleDelete={mockTitleDelete} />);
});
