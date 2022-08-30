import { render, screen } from '@testing-library/react';
import TotalRewardPointsThreeMonths from './TotalRewardPointsThreeMonths';

describe('<TotalRewardPointsThreeMonths />', () => {
  const mockData = [
    {
      buyerId: 'tes1',
      rewardPoints: 1,
    },
    {
      buyerId: 'tes3',
      rewardPoints: 2,
    },
    {
      buyerId: 'tes2',
      rewardPoints: 3,
    },

    {
      buyerId: 'tes2',
      rewardPoints: 4,
    },

    {
      buyerId: 'tes3',
      rewardPoints: 5,
    },
    {
      buyerId: 'test3',
      rewardPoints: 6,
    },

    {
      buyerId: 'test3',
      rewardPoints: 7,
    },
  ];

  it('should match snapshot', () => {
    const { asFragment } = render(
      <TotalRewardPointsThreeMonths totalData={mockData} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should contain h3 title', () => {
    render(<TotalRewardPointsThreeMonths totalData={mockData} />);
    const title = screen.getByText('Total Three Months:');
    expect(title).toBeInTheDocument();
  });
});
