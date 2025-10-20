import {render, renderHook} from '@testing-library/react-native';

import {Carousel} from '../../src/components/Carousel';
import {Provider} from 'react-redux';
import React from 'react';
import carouselReducer from '../../src/store/carouselSlice';
import {configureStore} from '@reduxjs/toolkit';
import {useCarousel} from '../../src/hooks/useCarousel';

const makeStore = preloadedState =>
  configureStore({
    reducer: {carousels: carouselReducer},
    preloadedState,
  });

const wrapper = ({children}) => {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('Carousel', () => {
  const carousel = {
    title: 'Featured',
    type: 'poster',
    items: [
      {title: 'Item 1', videoUrl: 'https://example.com/video1.mp4'},
      {title: 'Item 2', videoUrl: 'https://example.com/video2.mp4'},
    ],
  };

  test('renders container and title', () => {
    const {toJSON} = render(<Carousel carousel={carousel} />, {wrapper});
    expect(toJSON()).toBeTruthy();
  });

  test('returns null when no items after filtering', () => {
    const carouselEmpty = {
      title: 'Empty',
      type: 'poster',
      items: [
        {title: 'Item 1', videoUrl: ''}, // Invalid video URL
        {title: 'Item 2'}, // No video URL
      ],
    };
    const {toJSON} = render(<Carousel carousel={carouselEmpty} />, {wrapper});
    expect(toJSON()).toBeNull();
  });

  test('useCarousel hook returns expected structure', () => {
    const {result} = renderHook(() => useCarousel(carousel), {wrapper});
    expect(result.current.filteredItems).toBeDefined();
    expect(typeof result.current.renderItem).toBe('function');
    expect(typeof result.current.keyExtractor).toBe('function');
    expect(typeof result.current.getItemLayout).toBe('function');
  });

  test('useCarousel hook handles poster type', () => {
    const {result} = renderHook(() => useCarousel(carousel), {wrapper});
    const layout = result.current.getItemLayout();
    expect(layout.length).toBeGreaterThan(0);
    expect(layout.offset).toBeGreaterThan(0);
  });

  test('useCarousel hook handles landscape type', () => {
    const landscapeCarousel = {
      title: 'Landscape',
      type: 'landscape',
      items: [{title: 'Item 1', videoUrl: 'https://example.com/video1.mp4'}],
    };
    const {result} = renderHook(() => useCarousel(landscapeCarousel), {
      wrapper,
    });
    const layout = result.current.getItemLayout();
    expect(layout.length).toBeGreaterThan(0);
    expect(layout.offset).toBeGreaterThan(0);
  });
});
