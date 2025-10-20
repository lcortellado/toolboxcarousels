import {act, renderHook} from '@testing-library/react-native';

import {Provider} from 'react-redux';
import React from 'react';
import carouselReducer from '../../src/store/carouselSlice';
import {configureStore} from '@reduxjs/toolkit';
import {useCarouselItem} from '../../src/hooks/useCarouselItem';

const makeStore = preloadedState =>
  configureStore({
    reducer: {carousels: carouselReducer},
    preloadedState,
  });

const wrapper = ({children}) => {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('useCarouselItem', () => {
  const mockItem = {
    title: 'Test Item',
    posterUrl: 'https://example.com/poster.jpg',
    thumbnailUrl: 'https://example.com/thumbnail.jpg',
    videoUrl: 'https://example.com/video.mp4',
  };

  test('returns expected structure', () => {
    const {result} = renderHook(() => useCarouselItem(mockItem, 'poster'), {
      wrapper,
    });

    expect(result.current).toHaveProperty('imageLoading');
    expect(result.current).toHaveProperty('imageError');
    expect(result.current).toHaveProperty('errorText');
    expect(result.current).toHaveProperty('placeholderIcon');
    expect(result.current).toHaveProperty('handleImageLoad');
    expect(result.current).toHaveProperty('handleImageError');
    expect(result.current).toHaveProperty('handleItemPress');
    expect(typeof result.current.handleImageLoad).toBe('function');
    expect(typeof result.current.handleImageError).toBe('function');
    expect(typeof result.current.handleItemPress).toBe('function');
  });

  test('initializes with correct default values', () => {
    const {result} = renderHook(() => useCarouselItem(mockItem, 'poster'), {
      wrapper,
    });

    expect(result.current.imageLoading).toBe(true);
    expect(result.current.imageError).toBe(false);
    expect(result.current.errorText).toBe('No poster');
    expect(result.current.placeholderIcon).toBe('🎬');
  });

  test('handles thumbnail type correctly', () => {
    const {result} = renderHook(() => useCarouselItem(mockItem, 'thumbnail'), {
      wrapper,
    });

    expect(result.current.errorText).toBe('No thumbnail');
    expect(result.current.placeholderIcon).toBe('📺');
  });

  test('handles image load successfully', () => {
    const {result} = renderHook(() => useCarouselItem(mockItem, 'poster'), {
      wrapper,
    });

    act(() => {
      result.current.handleImageLoad();
    });

    expect(result.current.imageLoading).toBe(false);
    expect(result.current.imageError).toBe(false);
  });

  test('handles image error', () => {
    const {result} = renderHook(() => useCarouselItem(mockItem, 'poster'), {
      wrapper,
    });

    act(() => {
      result.current.handleImageError();
    });

    expect(result.current.imageLoading).toBe(false);
    expect(result.current.imageError).toBe(true);
  });

  test('handleItemPress dispatches showVideoPlayer action', () => {
    const store = makeStore();
    const wrapperWithStore = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useCarouselItem(mockItem, 'poster'), {
      wrapper: wrapperWithStore,
    });

    act(() => {
      result.current.handleItemPress();
    });

    const state = store.getState();
    expect(state.carousels.videoPlayer.visible).toBe(true);
    expect(state.carousels.videoPlayer.videoUrl).toBe(mockItem.videoUrl);
    expect(state.carousels.videoPlayer.title).toBe(mockItem.title);
  });

  test('handleItemPress does nothing when no videoUrl', () => {
    const itemWithoutVideo = {...mockItem, videoUrl: null};
    const store = makeStore();
    const wrapperWithStore = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(
      () => useCarouselItem(itemWithoutVideo, 'poster'),
      {wrapper: wrapperWithStore},
    );

    act(() => {
      result.current.handleItemPress();
    });

    const state = store.getState();
    expect(state.carousels.videoPlayer.visible).toBe(false);
  });
});
