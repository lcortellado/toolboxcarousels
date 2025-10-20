import {useCallback, useMemo, useState} from 'react';

import {showVideoPlayer} from '../store/carouselSlice';
import {useDispatch} from 'react-redux';

export const useCarouselItem = (item, type) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const dispatch = useDispatch();

  const handleItemPress = useCallback(() => {
    if (item.videoUrl) {
      dispatch(
        showVideoPlayer({
          videoUrl: item.videoUrl,
          title: item.title,
        }),
      );
    }
  }, [item.videoUrl, item.title, dispatch]);

  const handleImageLoad = useCallback(() => {
    setImageLoading(false);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoading(false);
    setImageError(true);
  }, []);

  const placeholderIcon = useMemo(() => {
    return type === 'poster' ? '🎬' : '📺';
  }, [type]);

  const errorText = useMemo(() => {
    return type === 'poster' ? 'No poster' : 'No thumbnail';
  }, [type]);

  return {
    imageLoading,
    imageError,
    handleItemPress,
    handleImageLoad,
    handleImageError,
    placeholderIcon,
    errorText,
  };
};
