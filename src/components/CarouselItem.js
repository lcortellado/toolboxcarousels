import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';

import FastImage from 'react-native-fast-image';
import {LoadingSpinner} from './LoadingSpinner';
import {useCarouselItem} from '../hooks/useCarouselItem';

const {width: screenWidth} = Dimensions.get('window');

const CarouselItem = ({item, type}) => {
  const {
    imageLoading,
    imageError,
    handleItemPress,
    handleImageLoad,
    handleImageError,
    placeholderIcon,
    errorText,
  } = useCarouselItem(item, type);

  const dimensions = useMemo(() => {
    if (type === 'poster') {
      return {
        width: screenWidth * 0.28,
        height: screenWidth * 0.42,
        marginHorizontal: 6,
      };
    } else {
      return {
        width: screenWidth * 0.35,
        height: screenWidth * 0.28,
        marginHorizontal: 6,
      };
    }
  }, [type]);

  return (
    <TouchableOpacity
      style={[styles.itemContainer, dimensions]}
      onPress={handleItemPress}
      activeOpacity={0.8}>
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.loadingContainer}>
            <LoadingSpinner text="Loading..." variant="default" />
          </View>
        )}

        {!imageError ? (
          <FastImage
            style={styles.image}
            source={{
              uri: item.imageUrl,
              priority: FastImage.priority.normal,
            }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <View style={styles.errorContainer}>
            <View style={styles.placeholderIcon}>
              <Text style={styles.placeholderIconText}>{placeholderIcon}</Text>
            </View>
            <Text style={styles.errorText}>{errorText}</Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 12,
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '75%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    zIndex: 1,
    padding: 20,
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 20,
  },
  placeholderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  placeholderIconText: {
    fontSize: 20,
  },
  errorText: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  textContainer: {
    padding: 12,
    paddingTop: 8,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
});

export {CarouselItem};
