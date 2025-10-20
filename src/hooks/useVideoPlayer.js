import {hideVideoPlayer, selectVideoPlayer} from '../store/carouselSlice';
import {useCallback, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Alert} from 'react-native';

export const useVideoPlayer = () => {
  const dispatch = useDispatch();
  const videoPlayer = useSelector(selectVideoPlayer);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  const handleClose = useCallback(() => {
    dispatch(hideVideoPlayer());
    setIsLoading(true);
    setHasError(false);
    setIsPaused(false);
    setShowPlayButton(false);
  }, [dispatch]);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleVideoError = useCallback(
    error => {
      setIsLoading(false);
      setHasError(true);

      Alert.alert(
        'Playback Error',
        'Could not play this video. The format may not be compatible or the link may be broken.',
        [
          {
            text: 'Retry',
            onPress: () => {
              setIsLoading(true);
              setHasError(false);
            },
          },
          {
            text: 'Close',
            onPress: handleClose,
            style: 'cancel',
          },
        ],
      );
    },
    [handleClose],
  );

  const handleVideoPress = useCallback(() => {
    setIsPaused(!isPaused);
    setShowPlayButton(true);

    setTimeout(() => {
      setShowPlayButton(false);
    }, 2000);
  }, [isPaused]);

  const handleVideoBuffer = useCallback(({isBuffering}) => {
    if (isBuffering) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleVideoLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleVideoEnd = useCallback(() => {
    setIsPaused(true);
  }, []);

  const showNoVideoAlert = useCallback(() => {
    Alert.alert('Video not available', 'This content has no video available.', [
      {text: 'OK', onPress: handleClose},
    ]);
  }, [handleClose]);

  const handlePlaybackStateChanged = useCallback(
    data => {
      if (data.isPlaying !== !isPaused) {
        setIsPaused(!data.isPlaying);
      }
    },
    [isPaused],
  );

  const retryVideo = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    setIsPaused(false);
  }, []);

  return {
    // State
    videoPlayer,
    videoRef,
    isLoading,
    hasError,
    isPaused,
    showPlayButton,

    // Actions
    handleClose,
    handleVideoLoad,
    handleVideoError,
    handleVideoPress,
    handleVideoBuffer,
    handleVideoLoadStart,
    handleVideoEnd,
    showNoVideoAlert,
    handlePlaybackStateChanged,
    retryVideo,
  };
};
