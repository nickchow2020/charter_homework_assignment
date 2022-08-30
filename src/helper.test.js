import helper from './helper';
import { faker } from '@faker-js/faker';
let mockData;
let mockRewardPoint;

beforeEach(() => {
  mockData = [
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
  ];

  mockRewardPoint = [
    { buyerId: 'test1', rewardPoints: 1 },
    { buyerId: 'test2', rewardPoints: 2 },
    { buyerId: 'test1', rewardPoints: 3 },
    { buyerId: 'test2', rewardPoints: 4 },
    { buyerId: 'test1', rewardPoints: 5 },
  ];
});

describe('Testing helper function sortAndParseDateMonthAddRewardPoints', () => {
  it('should convert transactionDate to mm dd yyyy format', () => {
    const data = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    expect(data[0].transactionDate).toEqual('Apr 30 2022');
    expect(data[1].transactionDate).toEqual('May 01 2022');
    expect(data[2].transactionDate).toEqual('May 02 2022');
  });

  it('should add rewardPoints property into mockData and calculate reward points', () => {
    const data = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    expect(data[0]).toHaveProperty('rewardPoints');
    expect(data[1].rewardPoints).toBe(4);
  });

  it('should sort date from earlier to later', () => {
    const data = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    expect(data[0].transactionDate).toEqual('Apr 30 2022');
    expect(data[1].transactionDate).toEqual('May 01 2022');
    expect(data[2].transactionDate).toEqual('May 02 2022');
  });
});

describe('Testing helper function groupByCategory', () => {
  test('able to group by buyerId', () => {
    const data = helper.groupByCategory(mockData, 'buyerId');
    expect(data['tes2'].length).toBe(2);
    expect(data['tes3'].length).toBe(2);
  });

  test('able to group by itemId', () => {
    const parseData = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    const data = helper.groupByCategory(parseData, 'itemId');
    const itemIds = Object.keys(data);

    expect(itemIds.length).toBe(4);
    expect(data['te4'].length).toBe(4);
  });
});

describe('Testing helper function groupBuyerId', () => {
  test('able to group by buyerId under the each month', () => {
    const parseData = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    const groupByMonthData = helper.groupTransactionDateMonth(parseData);
    const groupBuyerIdData = helper.groupBuyerId(groupByMonthData);

    const MayBuyerId = Object.keys(groupBuyerIdData['May']);
    const AprBuyerId = Object.keys(groupBuyerIdData['Apr']);
    const JunBuyerId = Object.keys(groupBuyerIdData['Jun']);

    expect(MayBuyerId.length).toBe(3);
    expect(AprBuyerId.length).toBe(1);
    expect(JunBuyerId.length).toBe(1);
  });
});

describe('Testing helper function calculateRewardPoints', () => {
  test('if purchase under 50 or 50 return 0 points', () => {
    const points = helper.calculateRewardPoints(50);
    const points1 = helper.calculateRewardPoints(2);

    expect(points).toBe(0);
    expect(points1).toBe(0);
  });

  test('every dollar spends over 50 and under 100 plus one points', () => {
    const points = helper.calculateRewardPoints(70);
    const points1 = helper.calculateRewardPoints(100);

    expect(points).toBe(20);
    expect(points1).toBe(50);
  });

  test('every dollar spends over 100 will plus 2 points', () => {
    const points = helper.calculateRewardPoints(170);
    const points1 = helper.calculateRewardPoints(120);

    expect(points).toBe(190);
    expect(points1).toBe(90);
  });
});

describe('Testing helper function getKeysWithUniqueID', () => {
  it('should return array of keys value from a giving object', () => {
    const keys = helper.getKeysWithUniqueID(mockData[0]);
    const parseData = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    const groupByMonthData = helper.groupTransactionDateMonth(parseData);
    const keys2 = helper.getKeysWithUniqueID(groupByMonthData);

    expect(keys[0].key).toBe('buyerId');
    expect(keys2[1].key).toBe('May');
  });
});

describe('Testing helper function calculateTotalRewardPointPerMonth', () => {
  it('should return total reward point of giving array', () => {
    const parseData = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    const totalPoints = helper.calculateTotalRewardPointPerMonth(parseData);

    const totalPoints1 =
      helper.calculateTotalRewardPointPerMonth(mockRewardPoint);

    expect(totalPoints).toBe(650);
    expect(totalPoints1).toBe(15);
  });
});

describe('Testing helper function calculateTotalRewardPointsForEachBuyerId', () => {
  it('should group buyerId and calculate it total rewardPoints', () => {
    const data = helper.calculatePointsForEachBuyerId(mockRewardPoint);

    const keys = Object.keys(data);

    expect(data['test2'].totalPoints).toBe(6);
    expect(data['test1'].totalPoints).toBe(9);
    expect(keys.length).toBe(2);
  });
});

describe('Testing helper function groupTransactionDateMonth', () => {
  it('should group buyerId and calculate it total rewardPoints', () => {
    const parseData = helper.sortAndParseDateMonthAddRewardPoints(mockData);
    const data = helper.groupTransactionDateMonth(parseData);

    const keys = Object.keys(data);

    expect(data['May'].length).toBe(5);
    expect(data['Jun'].length).toBe(1);
    expect(data['Apr'].length).toBe(1);
    expect(keys.length).toBe(3);
  });
});
