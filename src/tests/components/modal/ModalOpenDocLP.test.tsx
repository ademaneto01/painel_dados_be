import React from 'react';
import { render, act } from '@testing-library/react';
import { ModalOpenDocLP } from '../../../components/modal';

jest.mock('../../../backendApi', () => ({
  getUnits: jest.fn(() =>
    Promise.resolve([
      { id: 'unit1', doc: 'https://example.com/unit1' },
      { id: 'unit2', doc: 'https://example.com/unit2' },
    ]),
  ),
}));

describe('ModalOpenDocLP', () => {
  test('should navigate to the previous unit when previous button is clicked', async () => {
    await act(async () => {
      render(
        <ModalOpenDocLP
          urlDoc="https://example.com/unit1"
          onCancel={() => {}}
          unitsKey="unit1"
          unitsData={[
            { id: 'unit1', doc: 'https://example.com/unit1' },
            { id: 'unit2', doc: 'https://example.com/unit2' },
          ]}
        />,
      );
    });
  });
});
