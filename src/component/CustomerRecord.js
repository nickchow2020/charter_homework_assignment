const CustomerRecord = ({ record }) => {
  return (
    <>
      <tr>
        <td>{record.buyerId}</td>
        <td>{record.transactionNumber}</td>
        <td>{record.name}</td>
        <td>{record.purchaseItem}</td>
        <td>{record.price}</td>
        <td>{record.rewardPoints}</td>
        <td>{record.transactionDate}</td>
      </tr>
    </>
  );
};

export default CustomerRecord;
