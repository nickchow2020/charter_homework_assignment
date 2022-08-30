import useParseData from './useParseData';
import { renderHook, act } from '@testing-library/react';
import { faker } from '@faker-js/faker';

describe('useParseData', () => {
  const mockData = {
    transactions: [
      {
        buyerId: 'tes1',
        itemId: 'tes1',
        itemName: 'tes1',
        price: 154.64,
        transactionDate: faker.date.between(
          '2022-05-01T00:00:00.000Z',
          '2022-05-01T00:00:00.000Z'
        ),
      },
      {
        buyerId: 'tes3',
        itemId: 'tes3',
        itemName: 'tes3',
        price: 15.64,
        transactionDate: faker.date.between(
          '2022-05-03T00:00:00.000Z',
          '2022-05-03T00:00:00.000Z'
        ),
      },
      {
        buyerId: 'tes2',
        itemId: 'tes2',
        itemName: 'tes2',
        price: 54.64,
        transactionDate: faker.date.between(
          '2022-05-02T00:00:00.000Z',
          '2022-05-02T00:00:00.000Z'
        ),
      },

      {
        buyerId: 'tes2',
        itemId: 'te4',
        itemName: 'tes4',
        price: 124.64,
        transactionDate: faker.date.between(
          '2022-05-03T00:00:00.000Z',
          '2022-05-03T00:00:00.000Z'
        ),
      },

      {
        buyerId: 'tes3',
        itemId: 'te4',
        itemName: 'tes4',
        price: 140.6,
        transactionDate: faker.date.between(
          '2022-05-04T00:00:00.000Z',
          '2022-05-04T00:00:00.000Z'
        ),
      },
      {
        buyerId: 'test3',
        itemId: 'te4',
        itemName: 'tes4',
        price: 140.6,
        transactionDate: faker.date.between(
          '2022-05-04T00:00:00.000Z',
          '2022-05-04T00:00:00.000Z'
        ),
      },

      {
        buyerId: 'test3',
        itemId: 'te4',
        itemName: 'tes4',
        price: 140.6,
        transactionDate: faker.date.between(
          '2022-06-04T00:00:00.000Z',
          '2022-06-04T00:00:00.000Z'
        ),
      },
    ],
  };

  it('should have a value of null by default with originalData', () => {
    const { result } = renderHook(useParseData);
    expect(result.current.originalData).toBeNull();
  });

  it('should able to parse data', () => {
    const { result } = renderHook(useParseData);
    act(() => {
      result.current.setOriginalData(mockData);
    });

    expect(result.current.originalData).not.toBeNull();
    expect(result.current.months.length).toBe(3);
    expect(result.current.months[0]).toEqual({
      key: 'Apr',
      id: expect.any(String),
    });

    expect(result.current.totalData.length).toBe(7);
    expect(result.current.transactionData).toEqual({
      Apr: { tes1: expect.any(Array) },
      May: {
        tes2: expect.any(Array),
        tes3: expect.any(Array),
        test3: expect.any(Array),
      },
      Jun: { test3: expect.any(Array) },
    });
  });
});
