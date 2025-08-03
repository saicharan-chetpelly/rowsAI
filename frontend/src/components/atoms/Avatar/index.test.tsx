import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from './index';

describe('Avatar', () => {
  it('should render Avatar component', () => {
    render(<Avatar variant="circular">S</Avatar>);
    const avatar = screen.getByText('S');
    expect(avatar).toBeInTheDocument();
  });
});
