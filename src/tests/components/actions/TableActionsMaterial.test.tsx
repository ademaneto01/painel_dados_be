import { render } from '@testing-library/react';
import { TableActionsMaterial } from '../../../components/actions';

describe('TableActionsMaterial component', () => {
  test('should render ok', () => {
    const props = {
      id: 'materialId',
      titleDelete: 'Material A',
    };

    render(<TableActionsMaterial {...props} />);
  });
});
