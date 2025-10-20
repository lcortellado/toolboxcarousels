import {render, renderHook, screen} from '@testing-library/react-native';

import {CarouselItem} from '../../src/components/CarouselItem';
import React from 'react';
import {useCarouselItem} from '../../src/hooks/useCarouselItem';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('CarouselItem', () => {
  const item = {title: 'Item 1', imageUrl: 'https://example.com/img.jpg'};

  test('renders with poster type', () => {
    const {toJSON} = render(<CarouselItem item={item} type="poster" />);
    expect(toJSON()).toBeTruthy();
  });

  test('renders with landscape type', () => {
    const {toJSON} = render(<CarouselItem item={item} type="landscape" />);
    expect(toJSON()).toBeTruthy();
  });

  test('shows title', () => {
    render(<CarouselItem item={item} type="poster" />);
    expect(screen.getByText('Item 1')).toBeTruthy();
  });

  test('useCarouselItem hook returns expected values', () => {
    const {result} = renderHook(() => useCarouselItem(item, 'poster'));
    expect(result.current.errorText).toBe('No poster');
    expect(result.current.placeholderIcon).toBe('🎬');
    expect(typeof result.current.handleItemPress).toBe('function');
  });

  test('useCarouselItem hook handles landscape type', () => {
    const {result} = renderHook(() => useCarouselItem(item, 'landscape'));
    expect(result.current.errorText).toBe('No thumbnail');
    expect(result.current.placeholderIcon).toBe('📺');
  });
});
