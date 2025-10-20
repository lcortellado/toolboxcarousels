import {render, renderHook} from '@testing-library/react-native';

import {HomeScreen} from '../../src/screens/Home/HomeScreen';
import {Provider} from 'react-redux';
import React from 'react';
import carouselReducer from '../../src/store/carouselSlice';
import {configureStore} from '@reduxjs/toolkit';
import {useHomeScreen} from '../../src/hooks/useHomeScreen';

jest.mock('../../src/services/api', () => ({
  login: jest.fn(() => Promise.resolve({token: 'test'})),
  getCarouselData: jest.fn(() => Promise.resolve([])),
}));

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
      videoPlayer: {
        visible: false,
        videoUrl: null,
        title: null,
      },
    },
  });
  return <Provider store={store}>{children}</Provider>;
};

describe('HomeScreen', () => {
  test('renders with data', () => {
    const store = makeStore({
      carousels: {
        carousels: [{title: 'Featured', items: []}],
        loading: false,
        error: null,
        videoPlayer: {
          visible: false,
          videoUrl: null,
          title: null,
        },
      },
    });

    const TestWrapper = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );
    const {toJSON} = render(<HomeScreen />, {wrapper: TestWrapper});
    expect(toJSON()).toBeTruthy();
  });

  test('renders loading state', () => {
    const store = makeStore({
      carousels: {
        carousels: [],
        loading: true,
        error: null,
        videoPlayer: {
          visible: false,
          videoUrl: null,
          title: null,
        },
      },
    });
    const TestWrapper = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );
    const {toJSON} = render(<HomeScreen />, {wrapper: TestWrapper});
    expect(toJSON()).toBeTruthy();
  });

  test('renders empty state', () => {
    const store = makeStore({
      carousels: {
        carousels: [],
        loading: false,
        error: null,
        videoPlayer: {
          visible: false,
          videoUrl: null,
          title: null,
        },
      },
    });
    const TestWrapper = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );
    const {toJSON} = render(<HomeScreen />, {wrapper: TestWrapper});
    expect(toJSON()).toBeTruthy();
  });

  test('useHomeScreen hook returns expected structure', () => {
    const {result} = renderHook(() => useHomeScreen(), {wrapper});
    expect(result.current.hasData).toBeDefined();
    expect(result.current.isLoading).toBeDefined();
    expect(typeof result.current.onRefresh).toBe('function');
    expect(typeof result.current.keyExtractor).toBe('function');
    expect(typeof result.current.renderItem).toBe('function');
  });

  test('useHomeScreen hook handles loading state', () => {
    const store = makeStore({
      carousels: {
        carousels: [],
        loading: true,
        error: null,
      },
    });
    const TestWrapper = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );
    const {result} = renderHook(() => useHomeScreen(), {wrapper: TestWrapper});
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasData).toBe(false);
  });
});
