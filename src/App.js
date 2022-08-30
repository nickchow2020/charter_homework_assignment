import { useEffect } from 'react';
import './App.css';
import { fetchDataFromApi } from './server';
import CustomerRecordMonth from './component/CustomerRecordMonth';
import { GeneralProvider } from './generalContext';
import TotalRewardPointsThreeMonths from './component/TotalRewardPointsThreeMonths';
import useParseData from './hooks/useParseData';

function App() {
  const { setOriginalData, transactionData, months, totalData, originalData } =
    useParseData();

  useEffect(() => {
    (async function () {
      try {
        const data = await fetchDataFromApi();
        setOriginalData(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setOriginalData]);

  return (
    <div>
      {transactionData && (
        <>
          <h2>Store Name: {originalData.storeName}</h2>
          <h2>Total Customer: {originalData.totalCustomers}</h2>
          <GeneralProvider transactionData={transactionData}>
            {months.map((obj) => (
              <CustomerRecordMonth month={obj.key} key={obj.id} />
            ))}
          </GeneralProvider>

          <TotalRewardPointsThreeMonths totalData={totalData} />
        </>
      )}

      {!transactionData && (
        <>
          <h1>Loading.....</h1>
        </>
      )}
    </div>
  );
}

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

export default App;
