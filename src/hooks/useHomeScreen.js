import {
  clearError,
  fetchCarouselData,
  login,
  selectCarousels,
  selectError,
  selectLoading,
} from '../store/carouselSlice';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect, useState} from 'react';

import {Alert} from 'react-native';
import {filterValidCarousels} from '../utils/carouselValidation';

export const useHomeScreen = () => {
  const dispatch = useDispatch();
  const carousels = useSelector(selectCarousels, shallowEqual);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [refreshing, setRefreshing] = useState(false);

  const handleLoadData = useCallback(async () => {
    try {
      await dispatch(login()).unwrap();
      await dispatch(fetchCarouselData()).unwrap();
    } catch (err) {
      console.error('Error loading data:', err);
    }
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await handleLoadData();
    } finally {
      setRefreshing(false);
    }
  }, [handleLoadData]);

  useEffect(() => {
    handleLoadData();
  }, [handleLoadData]);

  useEffect(() => {
    if (!error) {
      return;
    }
    const buttons = loading
      ? [{text: 'OK', onPress: () => dispatch(clearError())}]
      : [
          {
            text: 'Retry',
            onPress: () => {
              dispatch(clearError());
              handleLoadData();
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => dispatch(clearError()),
          },
        ];
    Alert.alert('Error', error, buttons);
  }, [dispatch, error, handleLoadData, loading]);

  const keyExtractor = useCallback((item, index) => {
    return item.id ?? item.title ?? `carousel-${index}`;
  }, []);

  const renderItem = useCallback(({item}) => {
    const {Carousel} = require('../components/Carousel');
    return <Carousel carousel={item} />;
  }, []);

  const validCarousels = filterValidCarousels(carousels || []);
  const hasData = !!(validCarousels && validCarousels.length);
  const isLoading = loading;

  return {
    // Data
    carousels,
    validCarousels,
    loading,
    error,
    refreshing,
    hasData,
    isLoading,

    // Actions
    onRefresh,

    // Render helpers
    keyExtractor,
    renderItem,
  };
};
