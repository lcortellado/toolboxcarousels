import {filterItemsWithVideo} from '../utils/carouselValidation';
import {useCallback} from 'react';

export const useCarousel = carousel => {
  const filteredItems = filterItemsWithVideo(carousel.items);

  const renderItem = useCallback(
    ({item}) => {
      const {CarouselItem} = require('../components/CarouselItem');
      return <CarouselItem item={item} type={carousel.type} />;
    },
    [carousel.type],
  );

  const keyExtractor = useCallback(
    (item, index) => `${carousel.title}-${index}-${item.title}`,
    [carousel.title],
  );

  const getItemLayout = useCallback(() => {
    const {width: screenWidth} =
      require('react-native').Dimensions.get('window');
    const itemWidth =
      carousel.type === 'poster'
        ? screenWidth * 0.28 + 12
        : screenWidth * 0.35 + 12;

    return {
      length: itemWidth,
      offset: itemWidth,
    };
  }, [carousel.type]);

  return {
    filteredItems,
    renderItem,
    keyExtractor,
    getItemLayout,
  };
};
