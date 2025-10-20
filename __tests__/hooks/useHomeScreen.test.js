import {act, renderHook} from '@testing-library/react-native';

import {Provider} from 'react-redux';
import React from 'react';
import carouselReducer from '../../src/store/carouselSlice';
import {configureStore} from '@reduxjs/toolkit';
import {useHomeScreen} from '../../src/hooks/useHomeScreen';

const mockAlert = jest.fn();
jest.doMock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return {
    ...RN,
    Alert: {
      alert: mockAlert,
    },
  };
});

const makeStore = preloadedState =>
  configureStore({
    reducer: {carousels: carouselReducer},
    preloadedState,
  });

const wrapper = ({children}) => {
  const store = makeStore({
    carousels: {
      carousels: [],
      loading: false,
      error: null,
      authenticated: false,
      videoPlayer: {
        visible: false,
        videoUrl: null,
        title: null,
      },
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

describe('useHomeScreen', () => {
  test('returns expected structure', () => {
    const {result} = renderHook(() => useHomeScreen(), {wrapper});

    expect(result.current).toHaveProperty('carousels');
    expect(result.current).toHaveProperty('validCarousels');
    expect(result.current).toHaveProperty('loading');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('hasData');
    expect(result.current).toHaveProperty('refreshing');
    expect(result.current).toHaveProperty('error');
    expect(result.current).toHaveProperty('onRefresh');
    expect(typeof result.current.onRefresh).toBe('function');
  });

  test('initializes with correct default values', async () => {
    const {result} = renderHook(() => useHomeScreen(), {wrapper});

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.carousels).toEqual([]);
    expect(result.current.validCarousels).toEqual([]);
    expect(typeof result.current.loading).toBe('boolean');
    expect(typeof result.current.isLoading).toBe('boolean');
    expect(result.current.hasData).toBe(false);
    expect(result.current.refreshing).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test('handles loading state', () => {
    const store = makeStore({
      carousels: {
        carousels: [],
        loading: true,
        error: null,
        authenticated: false,
        videoPlayer: {
          visible: false,
          videoUrl: null,
          title: null,
        },
      },
    });

    const wrapperWithLoading = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useHomeScreen(), {
      wrapper: wrapperWithLoading,
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasData).toBe(false);
  });

  test('handles data state', async () => {
    const mockCarousels = [
      {
        title: 'Featured',
        type: 'poster',
        items: [
          {
            title: 'Item 1',
            videoUrl: 'https://example.com/video1.mp4',
          },
        ],
      },
    ];

    const store = makeStore({
      carousels: {
        carousels: mockCarousels,
        loading: false,
        error: null,
        authenticated: false,
        videoPlayer: {
          visible: false,
          videoUrl: null,
          title: null,
        },
      },
    });

    const wrapperWithData = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useHomeScreen(), {
      wrapper: wrapperWithData,
    });

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(result.current.carousels).toEqual(mockCarousels);
    expect(result.current.hasData).toBe(true);
    expect(typeof result.current.loading).toBe('boolean');
    expect(typeof result.current.isLoading).toBe('boolean');
  });

  test('onRefresh function is callable', () => {
    const {result} = renderHook(() => useHomeScreen(), {wrapper});

    expect(() => {
      act(() => {
        result.current.onRefresh();
      });
    }).not.toThrow();
  });

  test('filters valid carousels correctly', () => {
    const mockCarousels = [
      {
        title: 'Valid Carousel',
        type: 'poster',
        items: [
          {
            title: 'Item 1',
            videoUrl: 'https://example.com/video1.mp4',
          },
        ],
      },
      {
        title: 'Invalid Carousel',
        type: 'poster',
        items: [
          {
            title: 'Item 2',
            // No videoUrl
          },
        ],
      },
    ];

    const store = makeStore({
      carousels: {
        carousels: mockCarousels,
        loading: false,
        error: null,
        authenticated: false,
        videoPlayer: {
          visible: false,
          videoUrl: null,
          title: null,
        },
      },
    });

    const wrapperWithMixedData = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useHomeScreen(), {
      wrapper: wrapperWithMixedData,
    });

    expect(result.current.validCarousels).toHaveLength(1);
    expect(result.current.validCarousels[0].title).toBe('Valid Carousel');
    expect(result.current.hasData).toBe(true);
  });
});
