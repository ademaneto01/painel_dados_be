import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TableRow from '../../../components/Table/TableRow';

describe('TableRow', () => {
  const item = {
    id: 1,
    nome: 'João',
    idade: '30',
  };

  const accessors: ('nome' | 'idade')[] = ['nome', 'idade'];

  it('renders row data correctly', () => {
    const { getByText } = render(
      <table>
        <tbody>
          <TableRow id={1} item={item} accessors={accessors} />
        </tbody>
      </table>,
    );

    const nomeCell = getByText('João');
    const idadeCell = getByText('30');

    expect(nomeCell).toBeInTheDocument();
    expect(idadeCell).toBeInTheDocument();
  });

  it('applies odd row style when id is even', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow id={2} item={item} accessors={accessors} />
        </tbody>
      </table>,
    );

    const row = container.querySelector('tr');

    expect(row).toHaveClass('odd');
  });

  it('does not apply odd row style when id is odd', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow id={3} item={item} accessors={accessors} />
        </tbody>
      </table>,
    );

    const row = container.querySelector('tr');

    expect(row).not.toHaveClass('odd');
  });

  it('calls onClickRow with correct arguments when nome cell is clicked', () => {
    const onClickRowMock = jest.fn();

    const { getByText } = render(
      <table>
        <tbody>
          <TableRow
            id={1}
            item={item}
            accessors={accessors}
            onClickRow={onClickRowMock}
          />
        </tbody>
      </table>,
    );

    const nomeCell = getByText('João');
    fireEvent.click(nomeCell);

    expect(onClickRowMock).toHaveBeenCalledTimes(1);
    expect(onClickRowMock).toHaveBeenCalledWith(item, 'nome');
  });

  it('does not call onClickRow when other cell is clicked', () => {
    const onClickRowMock = jest.fn();

    const { getByText } = render(
      <table>
        <tbody>
          <TableRow
            id={1}
            item={item}
            accessors={accessors}
            onClickRow={onClickRowMock}
          />
        </tbody>
      </table>,
    );

    const idadeCell = getByText('30');
    fireEvent.click(idadeCell);

    expect(onClickRowMock).not.toHaveBeenCalled();
  });
});
