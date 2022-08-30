import { faker } from '@faker-js/faker';

class Helper {
  // Sort dataset with Date, convert date format to MM DD YYYY,
  // Add rewardPoints to Each transaction
  static sortAndParseDateMonthAddRewardPoints(mockData) {
    return mockData
      .sort((a, b) => new Date(a.transactionDate - b.transactionDate))
      .map((data) => {
        const transactionDate = data.transactionDate.toString().slice(4, 15);
        const rewardPoints = this.calculateRewardPoints(data.price);
        return { ...data, transactionDate, rewardPoints };
      });
  }

  /**
   * group array of object dataset by object key and return a new object
   * with key and value pair. value is array of object
   * @example
   *
   * [{..May,item1}, {..Jun.,item2}, {..May.,item2}, {..Jun.,item1},...]
   *  =>
   * {
   *  item1:[{...May},{...May},...]
   *  item2:[{...Jun},{...Jun},...]
   * }
   *
   */
  static groupByCategory(mockData, category) {
    return mockData.reduce((acc, cur) => {
      let groupBy = cur[category];

      if (acc[groupBy] === undefined) {
        acc[groupBy] = [cur];
      } else {
        acc[groupBy].push(cur);
      }
      return acc;
    }, {});
  }

  /**
   * group array of object dataset by key and return a new object
   * and group by month
   * @example
   *
   * [{..May.}, {..Jun.}, {..May.}, {..Jun.},...]
   *  =>
   * {
   *  May:[{...May},{...May},...]
   *  Jun:[{...Jun},{...Jun},...]
   * }
   *
   */

  static groupTransactionDateMonth(data) {
    const newData = {};

    data.forEach((data) => {
      const month = data['transactionDate'].slice(0, 3);
      if (newData[month] === undefined) {
        newData[month] = [data];
      } else {
        newData[month].push(data);
      }
    });

    return newData;
  }

  /**
   * return a new object that group buyerId with key value pair under each month
   * @example
   * {
   *  May:[{.user1..May},{.user2..May}...]
   *  Jun:[{.user1..Jun},{.user2..Jun}...]
   * }
   *  =>
   * {
   *  May:{
   *    user1:[{.user1..May},{.user1..May}]，
   *    user2:[{.user2..May},{.user2..May}]}
   *  Jun:{
   *    user1:[{.user1..Jun},{.user1..Jun}]，
   *    user2:[{.user2..Jun},{.user2..JUn}]]
   *  }
   * }
   */
  static groupBuyerId(mockData) {
    const newMockData = { ...mockData };
    for (let month in newMockData) {
      newMockData[month] = this.groupByCategory(newMockData[month], 'buyerId');
    }
    return newMockData;
  }

  // Calculate each transaction reward points
  static calculateRewardPoints(price) {
    if (price < 50) return 0;
    if (price > 100) return Math.floor(price - 100) * 2 + 50;
    return Math.floor(price - 50);
  }

  /**
   * get object keys values and assign with a uniques identifier for key property use
   * return a array of object
   * @example
   * {
   *  May:[{.user1..May},{.user2..May}...]
   *  Jun:[{.user1..Jun},{.user2..Jun}...]
   * }
   *  =>
   * [
   * {key:'May',id:'uniques'},
   * {key:'Jun',id:'uniques'}
   * ]
   * }
   */
  static getKeysWithUniqueID(data) {
    return Object.keys(data).reduce((acc, cur) => {
      const obj = {
        key: cur,
        id: faker.datatype.uuid(),
      };
      acc.push(obj);
      return acc;
    }, []);
  }

  // giving a list of object with rewardPoints property of
  // calculate it's total
  static calculateTotalRewardPointPerMonth(data) {
    return data.reduce((acc, cur) => {
      acc += cur.rewardPoints;
      return acc;
    }, 0);
  }

  /**
   * giving a list of user dataset, group them by buyerId and keep adding points
   * return an object with key value pairs
   * @example
   * [
   *  {.user1..rewardPoints:1},
   *  {.user2..rewardPoints:1},
   *  {.user2..rewardPoints:2}
   * ]
   *  =>
   * {
   *  user1: {totalPoints:1, name:someone},
   *  user2: {totalPoints:2, name:someone}
   * }
   * }
   */
  static calculatePointsForEachBuyerId(totalData) {
    return totalData.reduce((acc, cur) => {
      let buyerId = cur['buyerId'];

      if (acc[buyerId] === undefined) {
        acc[buyerId] = {
          totalPoints: cur['rewardPoints'],
          name: cur['name'],
        };
      } else {
        acc[buyerId]['totalPoints'] += cur['rewardPoints'];
      }

      return acc;
    }, {});
  }
}

export default Helper;
