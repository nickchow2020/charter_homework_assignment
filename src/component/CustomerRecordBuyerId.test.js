import { render, screen } from '@testing-library/react';
import CustomerRecordBuyerId from './CustomerRecordBuyerId';
import GeneralContext from '../generalContext';

describe('<CustomerRecordBuyerId />', () => {
  const mockData = {
    May: {
      test1User: [
        {
          buyerId: 'test1User',
          itemId: '4f8c-9a93-b404057ca6ad',
          itemName: 'v-T5rIt^&t',
          rewardPoints: 30,
          transactionDate: 'May 05 2022',
          transactionNumber: 'c55-ae17-a9f22f2100a3',
        },
        {
          buyerId: 'test1User',
          itemId: 'b498a452-75e9-444f',
          itemName: '&A{H2@$v5]',
          rewardPoints: 110,
          transactionDate: 'May 15 2022',
          transactionNumber: 'e0903f84',
        },
      ],
      test2User: [
        {
          buyerId: 'test2User',
          itemId: 'be011917-1c7a-4f8c-9a93-b',
          itemName: 'v-T5rIt^&t',
          rewardPoints: 30,
          transactionDate: 'May 05 2022',
          transactionNumber: 'bd6b53eb-8d5a-4c5',
        },
        {
          buyerId: 'test2User',
          itemId: '444f-be07-af6322bc34b9',
          itemName: '&A{H2@$v5]',
          rewardPoints: 110,
          transactionDate: 'May 15 2022',
          transactionNumber: 'e0903f84-2611-45e0-',
        },
      ],
    },
  };
  it('should match snapshot', () => {
    const { asFragment } = render(
      <GeneralContext.Provider value={{ transactionData: mockData }}>
        <CustomerRecordBuyerId month='May' buyerId='test1User' />
      </GeneralContext.Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display total points correctly', () => {
    render(
      <GeneralContext.Provider value={{ transactionData: mockData }}>
        <CustomerRecordBuyerId month='May' buyerId='test1User' />
      </GeneralContext.Provider>
    );

    const displayTotal = screen.getByText('140');

    // 30 + 110
    expect(displayTotal).toBeInTheDocument();
  });
});
