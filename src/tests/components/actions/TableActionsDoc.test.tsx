import { render } from '@testing-library/react';
import { TableActionsDoc } from '../../../components/actions';

describe('TableActionsDoc component', () => {
  test('should render TableActionsDoc component', () => {
    const props = {
      id: 'documentId',
      titleDelete: 'Document A',
    };

    render(<TableActionsDoc {...props} />);
  });
});
