import helper from '../helper';
import TotalRewardPointsCell from './TotalRewardPointsCell';

const TotalRewardPointsThreeMonths = ({ totalData }) => {
  const buyers = helper.calculatePointsForEachBuyerId(totalData);
  const buyerIds = helper.getKeysWithUniqueID(buyers);
  return (
    <>
      <h3>Total Three Months:</h3>
      <table style={{ width: '100%', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>BuyerId</th>
            <th>Name</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {buyerIds.map((obj) => (
            <TotalRewardPointsCell
              key={obj.id}
              totalData={buyers}
              buyerId={obj.key}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TotalRewardPointsThreeMonths;
