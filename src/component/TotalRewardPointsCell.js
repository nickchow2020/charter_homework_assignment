import React from 'react';

function TotalRewardPointsCell({ buyerId, totalData }) {
  return (
    <tr>
      <th>{buyerId}</th>
      <td>{totalData[buyerId].name}</td>
      <td>{totalData[buyerId].totalPoints}</td>
    </tr>
  );
}

export default TotalRewardPointsCell;
