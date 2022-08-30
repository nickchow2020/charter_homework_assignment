import { render, screen } from '@testing-library/react';
import CustomerRecordMonth from './CustomerRecordMonth';
import { GeneralProvider } from '../generalContext';

describe('<CustomerRecordMonth />', () => {
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
      <GeneralProvider transactionData={mockData}>
        <CustomerRecordMonth month='May' />
      </GeneralProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should contain May', () => {
    render(
      <GeneralProvider transactionData={mockData}>
        <CustomerRecordMonth month='May' />
      </GeneralProvider>
    );
    expect(screen.getByText('May:')).toBeInTheDocument();
  });
});
