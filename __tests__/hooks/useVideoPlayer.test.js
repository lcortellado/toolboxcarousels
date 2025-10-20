import {act, renderHook} from '@testing-library/react-native';

import {Provider} from 'react-redux';
import React from 'react';
import carouselReducer from '../../src/store/carouselSlice';
import {configureStore} from '@reduxjs/toolkit';
import {useVideoPlayer} from '../../src/hooks/useVideoPlayer';

// Mock Alert without affecting react-native
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
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('useVideoPlayer', () => {
  test('returns expected structure', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    expect(result.current).toHaveProperty('videoPlayer');
    expect(result.current).toHaveProperty('videoRef');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('hasError');
    expect(result.current).toHaveProperty('isPaused');
    expect(result.current).toHaveProperty('showPlayButton');
    expect(result.current).toHaveProperty('handleClose');
    expect(result.current).toHaveProperty('handleVideoLoad');
    expect(result.current).toHaveProperty('handleVideoError');
    expect(result.current).toHaveProperty('handleVideoPress');
    expect(result.current).toHaveProperty('handleVideoBuffer');
    expect(result.current).toHaveProperty('handleVideoLoadStart');
    expect(result.current).toHaveProperty('handleVideoEnd');
    expect(result.current).toHaveProperty('showNoVideoAlert');
    expect(result.current).toHaveProperty('handlePlaybackStateChanged');
    expect(result.current).toHaveProperty('retryVideo');
    expect(typeof result.current.handleClose).toBe('function');
    expect(typeof result.current.handleVideoLoad).toBe('function');
    expect(typeof result.current.handleVideoError).toBe('function');
    expect(typeof result.current.handleVideoPress).toBe('function');
    expect(typeof result.current.handleVideoBuffer).toBe('function');
    expect(typeof result.current.handleVideoLoadStart).toBe('function');
    expect(typeof result.current.handleVideoEnd).toBe('function');
    expect(typeof result.current.showNoVideoAlert).toBe('function');
    expect(typeof result.current.handlePlaybackStateChanged).toBe('function');
    expect(typeof result.current.retryVideo).toBe('function');
  });

  test('initializes with correct default values', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    expect(result.current.videoPlayer.visible).toBe(false);
    expect(result.current.videoPlayer.videoUrl).toBe(null);
    expect(result.current.videoPlayer.title).toBe(null);
    expect(result.current.videoRef).toBeDefined();
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.showPlayButton).toBe(false);
  });

  test('handles video player state when visible', () => {
    const store = makeStore({
      carousels: {
        videoPlayer: {
          visible: true,
          videoUrl: 'https://example.com/video.mp4',
          title: 'Test Video',
        },
      },
    });

    const wrapperWithVideo = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useVideoPlayer(), {
      wrapper: wrapperWithVideo,
    });

    expect(result.current.videoPlayer.visible).toBe(true);
    expect(result.current.videoPlayer.videoUrl).toBe(
      'https://example.com/video.mp4',
    );
    expect(result.current.videoPlayer.title).toBe('Test Video');
  });

  test('handleClose dispatches hideVideoPlayer action and resets state', () => {
    const store = makeStore({
      carousels: {
        videoPlayer: {
          visible: true,
          videoUrl: 'https://example.com/video.mp4',
          title: 'Test Video',
        },
      },
    });

    const wrapperWithStore = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useVideoPlayer(), {
      wrapper: wrapperWithStore,
    });

    act(() => {
      result.current.handleClose();
    });

    const state = store.getState();
    expect(state.carousels.videoPlayer.visible).toBe(false);
    expect(state.carousels.videoPlayer.videoUrl).toBe(null);
    expect(state.carousels.videoPlayer.title).toBe(null);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.isPaused).toBe(false);
    expect(result.current.showPlayButton).toBe(false);
  });

  test('handleVideoLoad works correctly', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    act(() => {
      result.current.handleVideoLoad();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  test('handleVideoError works correctly', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    act(() => {
      result.current.handleVideoError({error: 'test error'});
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(true);
  });

  test('handleVideoPress toggles pause state', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    act(() => {
      result.current.handleVideoPress();
    });

    expect(result.current.isPaused).toBe(true);
    expect(result.current.showPlayButton).toBe(true);
  });

  test('handleVideoBuffer works correctly', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    act(() => {
      result.current.handleVideoBuffer({isBuffering: true});
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.handleVideoBuffer({isBuffering: false});
    });

    expect(result.current.isLoading).toBe(false);
  });

  test('handleVideoLoadStart works correctly', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    act(() => {
      result.current.handleVideoLoadStart();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
  });

  test('handleVideoEnd works correctly', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    act(() => {
      result.current.handleVideoEnd();
    });

    expect(result.current.isPaused).toBe(true);
  });

  test('retryVideo resets state correctly', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    act(() => {
      result.current.handleVideoError({error: 'test error'});
    });

    expect(result.current.hasError).toBe(true);

    act(() => {
      result.current.retryVideo();
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasError).toBe(false);
    expect(result.current.isPaused).toBe(false);
  });

  test('videoRef is properly initialized', () => {
    const {result} = renderHook(() => useVideoPlayer(), {wrapper});

    expect(result.current.videoRef).toBeDefined();
    expect(result.current.videoRef.current).toBe(null);
  });

  test('handles video player state changes', () => {
    const store = makeStore();
    const wrapperWithStore = ({children}) => (
      <Provider store={store}>{children}</Provider>
    );

    const {result} = renderHook(() => useVideoPlayer(), {
      wrapper: wrapperWithStore,
    });

    expect(result.current.videoPlayer.visible).toBe(false);

    act(() => {
      store.dispatch({
        type: 'carousels/showVideoPlayer',
        payload: {
          videoUrl: 'https://example.com/new-video.mp4',
          title: 'New Video',
        },
      });
    });

    expect(result.current.videoPlayer.visible).toBe(true);
    expect(result.current.videoPlayer.videoUrl).toBe(
      'https://example.com/new-video.mp4',
    );
    expect(result.current.videoPlayer.title).toBe('New Video');
  });
});
