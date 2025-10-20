export const hasValidVideoUrl = item => {
  return (
    item &&
    item.videoUrl &&
    typeof item.videoUrl === 'string' &&
    item.videoUrl.trim() !== '' &&
    item.videoUrl !== 'null' &&
    item.videoUrl !== 'undefined'
  );
};

export const filterItemsWithVideo = items => {
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(hasValidVideoUrl);
};

export const hasValidItems = carousel => {
  if (!carousel || !carousel.items) {
    return false;
  }

  return filterItemsWithVideo(carousel.items).length > 0;
};

export const filterValidCarousels = carousels => {
  if (!Array.isArray(carousels)) {
    return [];
  }

  return carousels.filter(hasValidItems);
};

