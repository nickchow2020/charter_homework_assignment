import { faker } from '@faker-js/faker';

const totalBuyers = faker.datatype.number({ min: 5, max: 10 });
const totalBuyerIdsWithName = Array.from({ length: totalBuyers }, () => {
  return {
    buyerId: faker.datatype.uuid(),
    name: faker.name.fullName(),
  };
});

const MockData = {
  storeName: 'localRandomStore',
  totalCustomers: totalBuyers,
  transactions: Array.from(
    { length: faker.datatype.number({ min: 50, max: 100 }) },
    () => {
      const randomIndex = Math.floor(Math.random() * totalBuyers);
      return {
        transactionNumber: faker.datatype.number({
          min: 100000000,
          max: 900000000,
        }),
        buyerId: totalBuyerIdsWithName[randomIndex].buyerId,
        name: totalBuyerIdsWithName[randomIndex].name,
        purchaseItem: faker.commerce.product(),
        price: faker.commerce.price(20, 200, 2),
        transactionDate: faker.date.between(
          '2022-05-01T00:00:00.000Z',
          '2022-07-30T00:00:00.000Z'
        ),
      };
    }
  ),
};

/**
 *
 * Data Structure for MockData
 * @example
 *[{...},{...},{...},{...},{...},{...},{...},{...}...]
 */

export default MockData;
