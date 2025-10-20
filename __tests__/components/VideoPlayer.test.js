import {render, renderHook} from '@testing-library/react-native';

import {Provider} from 'react-redux';
import React from 'react';
import {VideoPlayer} from '../../src/components/VideoPlayer';
import carouselReducer from '../../src/store/carouselSlice';
import {configureStore} from '@reduxjs/toolkit';
import {useVideoPlayer} from '../../src/hooks/useVideoPlayer';

const makeStore = preloadedState =>
  configureStore({
    reducer: {carousels: carouselReducer},
    preloadedState,
  });

const wrapper = ({children}) => {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('VideoPlayer', () => {
  test('renders when visible', () => {
    const store = makeStore({
      carousels: {
        videoPlayer: {
          visible: true,
          videoUrl: 'https://example.com/video.mp4',
          title: 'Sample',
        },
      },
    });
    const TestWrapper = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );
    const {toJSON} = render(<VideoPlayer />, {wrapper: TestWrapper});
    expect(toJSON()).toBeTruthy();
  });

  test('renders null when not visible', () => {
    const store = makeStore({
      carousels: {
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
    const {toJSON} = render(<VideoPlayer />, {wrapper: TestWrapper});
    expect(toJSON()).toBeNull();
  });

  test('shows error state', () => {
    const store = makeStore({
      carousels: {
        videoPlayer: {
          visible: true,
          videoUrl: 'x',
          title: 'y',
        },
      },
    });
    const TestWrapper = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );
    const {toJSON} = render(<VideoPlayer />, {wrapper: TestWrapper});
    const json = toJSON();
    const str = JSON.stringify(json);

    expect(str).toContain('Cargando video...');
  });

  test('useVideoPlayer hook returns expected structure', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});
    expect(result.current.videoPlayer).toBeDefined();
    expect(result.current.videoRef).toBeDefined();
    expect(typeof result.current.handleClose).toBe('function');
    expect(typeof result.current.handleVideoLoad).toBe('function');
    expect(typeof result.current.handleVideoError).toBe('function');
  });

  test('useVideoPlayer hook handles video player state', () => {
    const store = makeStore({
      carousels: {
        videoPlayer: {
          visible: true,
          videoUrl: 'https://example.com/video.mp4',
          title: 'Test Video',
        },
      },
    });
    const TestWrapper = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );
    const {result} = renderHook(() => useVideoPlayer(), {wrapper: TestWrapper});
    expect(result.current.videoPlayer.visible).toBe(true);
    expect(result.current.videoPlayer.videoUrl).toBe(
      'https://example.com/video.mp4',
    );
    expect(result.current.videoPlayer.title).toBe('Test Video');
  });
});
