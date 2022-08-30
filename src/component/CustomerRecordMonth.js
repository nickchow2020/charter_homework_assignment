import { useContext } from 'react';
import helper from '../helper';
import CustomerRecordBuyerId from './CustomerRecordBuyerId';
import generalContext from '../generalContext';

const CustomerRecordMonth = ({ month }) => {
  const { transactionData } = useContext(generalContext);
  const buyerId = helper.getKeysWithUniqueID(transactionData[month]);
  return (
    <>
      <h1>{month}:</h1>
      {buyerId.map((obj) => {
        return (
          <CustomerRecordBuyerId key={obj.id} month={month} buyerId={obj.key} />
        );
      })}
    </>
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

export default CustomerRecordMonth;
