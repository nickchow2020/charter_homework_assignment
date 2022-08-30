import { useState, useEffect } from 'react';
import helper from '../helper';

const useParseData = () => {
  const [originalData, setOriginalData] = useState(null);

  const [transactionData, setTransactionData] = useState(null);
  const [months, setMonths] = useState(null);
  const [totalData, setTotalData] = useState(null);

  useEffect(() => {
    if (originalData) {
      const dateFormatData = helper.sortAndParseDateMonthAddRewardPoints(
        originalData.transactions
      );
      const groupByMonth = helper.groupTransactionDateMonth(dateFormatData);
      const groupBuyerId = helper.groupBuyerId(groupByMonth);
      setMonths(helper.getKeysWithUniqueID(groupBuyerId));
      setTransactionData(groupBuyerId);
      setTotalData(dateFormatData);
    }
  }, [originalData]);

  return { setOriginalData, transactionData, months, totalData, originalData };
};

export default useParseData;
