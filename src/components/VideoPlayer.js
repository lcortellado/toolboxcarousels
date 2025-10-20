import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import Video from 'react-native-video';
import {useVideoPlayer} from '../hooks/useVideoPlayer';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const VideoPlayer = () => {
  const {
    videoPlayer,
    videoRef,
    isLoading,
    hasError,
    isPaused,
    showPlayButton,
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
  } = useVideoPlayer();

  if (!videoPlayer.visible) {
    return null;
  }

  if (!videoPlayer.videoUrl) {
    showNoVideoAlert();
    return null;
  }

  return (
    <Modal
      visible={videoPlayer.visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}>
      <StatusBar hidden />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          activeOpacity={0.7}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        <View style={styles.videoContainer}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#6366f1" />
              <Text style={styles.loadingText}>Cargando video...</Text>
            </View>
          )}

          {hasError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error loading video</Text>
              <Text style={styles.errorSubtext}>
                The video could not be played. Check your internet connection or
                try again.
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={retryVideo}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeErrorButton}
                onPress={handleClose}>
                <Text style={styles.closeErrorButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.videoWrapper}
              onPress={handleVideoPress}
              activeOpacity={1}>
              <Video
                ref={videoRef}
                source={{uri: videoPlayer.videoUrl}}
                style={styles.video}
                controls={true}
                resizeMode="contain"
                onLoad={handleVideoLoad}
                onError={handleVideoError}
                onLoadStart={handleVideoLoadStart}
                onBuffer={handleVideoBuffer}
                onEnd={handleVideoEnd}
                paused={isPaused}
                repeat={false}
                playInBackground={false}
                playWhenInactive={false}
                onPlaybackStateChanged={handlePlaybackStateChanged}
              />

              {showPlayButton && (
                <View style={styles.playPauseOverlay}>
                  <View style={styles.playPauseButton}>
                    <Text style={styles.playPauseIcon}>
                      {isPaused ? '▶️' : '⏸️'}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>

        {videoPlayer.title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{videoPlayer.title}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 1000,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  closeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  videoWrapper: {
    width: screenWidth,
    height: screenHeight * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight * 0.75,
    backgroundColor: '#111111',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: screenWidth,
    height: screenHeight * 0.75,
    backgroundColor: '#111111',
    paddingHorizontal: 40,
  },
  errorText: {
    color: '#ffffff',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  errorSubtext: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: '400',
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 12,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  closeErrorButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  closeErrorButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 60,
    left: 24,
    right: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  playPauseOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  playPauseIcon: {
    fontSize: 32,
    color: '#ffffff',
  },
});

export {VideoPlayer};
