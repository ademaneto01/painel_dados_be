import React from 'react';
import { render } from '@testing-library/react';
import TableHeaders from '../../../components/Table/TableHeaders';

describe('TableHeaders', () => {
  it('renders headers correctly', () => {
    const headers = ['Nome', 'Idade', 'Cargo'];

    const { getByText } = render(
      <table>
        <TableHeaders headers={headers} />
      </table>,
    );

    headers.forEach((header) => {
      const headerElement = getByText(header);
      expect(headerElement).toBeInTheDocument();
    });
  });

  it('renders the correct number of headers', () => {
    const headers = ['Nome', 'Idade', 'Cargo'];

    const { container } = render(
      <table>
        <TableHeaders headers={headers} />
      </table>,
    );

    const thElements = container.querySelectorAll('th');
    expect(thElements.length).toBe(headers.length);
  });

  it('matches the snapshot', () => {
    const headers = ['Nome', 'Idade', 'Cargo'];

    const { asFragment } = render(
      <table>
        <TableHeaders headers={headers} />
      </table>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
