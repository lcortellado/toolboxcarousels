import {render, screen} from '@testing-library/react-native';

import {LoadingSpinner} from '../../src/components/LoadingSpinner';
import React from 'react';

describe('LoadingSpinner', () => {
  test('renders with default props', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  test('renders custom text', () => {
    render(<LoadingSpinner text="Loading data..." />);
    expect(screen.getByText('Loading data...')).toBeTruthy();
  });

  test('hides text when showText=false', () => {
    render(<LoadingSpinner showText={false} />);
    expect(screen.queryByText(/Loading/i)).toBeNull();
  });

  test('supports large variant', () => {
    const {toJSON} = render(<LoadingSpinner variant="large" />);
    expect(toJSON()).toBeTruthy();
  });

  test('supports minimal variant', () => {
    const {toJSON} = render(<LoadingSpinner variant="minimal" />);
    expect(toJSON()).toBeTruthy();
  });
});
