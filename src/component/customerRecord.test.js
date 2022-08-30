import { render, screen } from '@testing-library/react';
import CustomerRecord from './CustomerRecord';

describe('<CustomerRecord />', () => {
  const MockData = {
    buyerId: 'test1',
    transactionNumber: 'test2',
    itemI: 'test3',
    itemName: 'test4',
    price: 100,
    rewardPoints: 50,
    transactionDate: 'May 11 2022',
  };

  it('should match snapshot', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <CustomerRecord record={MockData} />
        </tbody>
      </table>
    );
    expect(asFragment).toMatchSnapshot();
  });

  it('should contain test1', () => {
    render(
      <table>
        <tbody>
          <CustomerRecord record={MockData} />
        </tbody>
      </table>
    );
    const targetText = screen.getByText('test1');

    expect(targetText).toBeInTheDocument();
  });

  it('should contain May 11 2022', () => {
    render(
      <table>
        <tbody>
          <CustomerRecord record={MockData} />
        </tbody>
      </table>
    );
    const targetText = screen.getByText('May 11 2022');

    expect(targetText).toBeInTheDocument();
  });
});
