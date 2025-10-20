import {Provider} from 'react-redux';
import React from 'react';
import carouselReducer from '../src/store/carouselSlice';
import {configureStore} from '@reduxjs/toolkit';
import {renderHook} from '@testing-library/react-native';
import {useCarousel} from '../src/hooks/useCarousel';

const makeStore = preloadedState =>
  configureStore({
    reducer: {carousels: carouselReducer},
    preloadedState,
  });

const wrapper = ({children}) => {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('useCarousel', () => {
  const mockCarousel = {
    title: 'Featured',
    type: 'poster',
    items: [
      {
        title: 'Item 1',
        posterUrl: 'https://example.com/poster1.jpg',
        videoUrl: 'https://example.com/video1.mp4',
      },
      {
        title: 'Item 2',
        posterUrl: 'https://example.com/poster2.jpg',
        videoUrl: 'https://example.com/video2.mp4',
      },
      {
        title: 'Item 3',
        posterUrl: 'https://example.com/poster3.jpg',
        // No videoUrl - should be filtered out
      },
    ],
  };

  test('returns expected structure', () => {
    const {result} = renderHook(() => useCarousel(mockCarousel), {wrapper});

    expect(result.current).toHaveProperty('filteredItems');
    expect(result.current).toHaveProperty('renderItem');
    expect(result.current).toHaveProperty('keyExtractor');
    expect(result.current).toHaveProperty('getItemLayout');
    expect(typeof result.current.renderItem).toBe('function');
    expect(typeof result.current.keyExtractor).toBe('function');
    expect(typeof result.current.getItemLayout).toBe('function');
  });

  test('filters items without videoUrl', () => {
    const {result} = renderHook(() => useCarousel(mockCarousel), {wrapper});

    expect(result.current.filteredItems).toHaveLength(2);
    expect(result.current.filteredItems[0].title).toBe('Item 1');
    expect(result.current.filteredItems[1].title).toBe('Item 2');
  });

  test('handles empty carousel', () => {
    const emptyCarousel = {
      title: 'Empty',
      type: 'poster',
      items: [],
    };

    const {result} = renderHook(() => useCarousel(emptyCarousel), {wrapper});

    expect(result.current.filteredItems).toHaveLength(0);
  });

  test('handles carousel with no valid items', () => {
    const invalidCarousel = {
      title: 'No Videos',
      type: 'poster',
      items: [
        {title: 'Item 1', posterUrl: 'https://example.com/poster1.jpg'},
        {title: 'Item 2', posterUrl: 'https://example.com/poster2.jpg'},
      ],
    };

    const {result} = renderHook(() => useCarousel(invalidCarousel), {wrapper});

    expect(result.current.filteredItems).toHaveLength(0);
  });

  test('renderItem returns CarouselItem component', () => {
    const {result} = renderHook(() => useCarousel(mockCarousel), {wrapper});

    const item = result.current.filteredItems[0];
    const renderedItem = result.current.renderItem({item});

    expect(renderedItem).toBeDefined();
    expect(renderedItem.type).toBeDefined();
  });

  test('keyExtractor works correctly', () => {
    const {result} = renderHook(() => useCarousel(mockCarousel), {wrapper});

    const item = result.current.filteredItems[0];
    const key = result.current.keyExtractor(item, 0);

    expect(key).toBe('Featured-0-Item 1');
  });

  test('getItemLayout returns correct layout for poster type', () => {
    const {result} = renderHook(() => useCarousel(mockCarousel), {wrapper});

    const layout = result.current.getItemLayout();

    expect(layout).toHaveProperty('length');
    expect(layout).toHaveProperty('offset');
    expect(typeof layout.length).toBe('number');
    expect(typeof layout.offset).toBe('number');
  });

  test('getItemLayout returns correct layout for thumbnail type', () => {
    const thumbnailCarousel = {...mockCarousel, type: 'thumbnail'};
    const {result} = renderHook(() => useCarousel(thumbnailCarousel), {
      wrapper,
    });

    const layout = result.current.getItemLayout();

    expect(layout).toHaveProperty('length');
    expect(layout).toHaveProperty('offset');
    expect(typeof layout.length).toBe('number');
    expect(typeof layout.offset).toBe('number');
  });

  test('handles undefined carousel gracefully', () => {
    expect(() => {
      renderHook(() => useCarousel(undefined), {wrapper});
    }).toThrow();
  });
});
