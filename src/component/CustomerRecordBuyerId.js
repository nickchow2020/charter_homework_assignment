import { useContext } from 'react';
import CustomerRecord from './CustomerRecord';
import helper from '../helper';
import generalContext from '../generalContext';
const CustomerRecordBuyerId = ({ month, buyerId }) => {
  const { transactionData } = useContext(generalContext);
  const transaction = transactionData[month][buyerId];
  const totalPoint = helper.calculateTotalRewardPointPerMonth(transaction);

  return (
    <table style={{ width: '100%', textAlign: 'center', marginBottom: '2rem' }}>
      <thead>
        <tr>
          <th>BuyerId</th>
          <th>TransitionNumber</th>
          <th>Name</th>
          <th>PurchaseItem</th>
          <th>Price</th>
          <th>RewardPoints</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {transaction.map((record) => (
          <CustomerRecord record={record} key={record.transactionNumber} />
        ))}

        <tr>
          <th colSpan={5} style={{ textAlign: 'right' }}>
            Total Points:
          </th>
          <td>{`${totalPoint}`}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};

/**
 *
 * Data Structure for transactionData
 * @example
 * {
 *  May:{
 *    buyerId1:[{...buyer1},{...buyer1},{...buyer1},{...buyer1}]
 *    buyerId2:[{...buyer2},{...buyer2},{...buyer2},{...buyer2}]
 *    buyerId3:[{...buyer3},{...buyer3},{...buyer3},{...buyer3}]
 *    }
 *  Jun:{
 *    buyerId1:[{...buyer1},{...buyer1},{...buyer1},{...buyer1}]
 *    buyerId2:[{...buyer2},{...buyer2},{...buyer2},{...buyer2}]
 *    buyerId3:[{...buyer3},{...buyer3},{...buyer3},{...buyer3}]
 *    }
 *  Jul:{
 *    buyerId1:[{...buyer1},{...buyer1},{...buyer1},{...buyer1}]
 *    buyerId2:[{...buyer2},{...buyer2},{...buyer2},{...buyer2}]
 *    buyerId3:[{...buyer3},{...buyer3},{...buyer3},{...buyer3}]
 *    }
 * }
 */

export default CustomerRecordBuyerId;
