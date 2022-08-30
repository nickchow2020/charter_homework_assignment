import { render, screen } from '@testing-library/react';
import TotalRewardPointsCell from './TotalRewardPointsCell';

describe('<TotalRewardPointsCell />', () => {
  const mockData = {
    buyer1: { totalPoints: 165, name: 'test1' },
    buyer2: { totalPoints: 156, name: 'test2' },
    buyer3: { totalPoints: 1325, name: 'test3' },
    buyer4: { totalPoints: 860, name: 'test4' },
  };

  it('should match snapshot', () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <TotalRewardPointsCell buyerId={'buyer1'} totalData={mockData} />
        </tbody>
      </table>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should contain the correct buyerId', () => {
    render(
      <table>
        <tbody>
          <TotalRewardPointsCell buyerId={'buyer1'} totalData={mockData} />
        </tbody>
      </table>
    );

    const buyer1 = screen.getByText('buyer1');

    expect(buyer1).toBeInTheDocument();
  });

  it('should display the correct points', () => {
    render(
      <table>
        <tbody>
          <TotalRewardPointsCell buyerId={'buyer3'} totalData={mockData} />
        </tbody>
      </table>
    );

    const point = screen.getByText('1325');

    expect(point).toBeInTheDocument();
  });

  it('should display buyer name', () => {
    render(
      <table>
        <tbody>
          <TotalRewardPointsCell buyerId={'buyer1'} totalData={mockData} />
        </tbody>
      </table>
    );

    const point = screen.getByText('test1');

    expect(point).toBeInTheDocument();
  });
});
