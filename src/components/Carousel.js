import {FlatList, StyleSheet, Text, View} from 'react-native';

import React from 'react';
import {useCarousel} from '../hooks/useCarousel';

const Carousel = ({carousel}) => {
  const {filteredItems, renderItem, keyExtractor, getItemLayout} =
    useCarousel(carousel);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{carousel.title}</Text>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={getItemLayout}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={10}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingVertical: 8,
    backgroundColor: '#111111',
    borderRadius: 16,
    marginHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 20,
    letterSpacing: 0.3,
  },
  listContainer: {
    paddingHorizontal: 4,
  },
});

export {Carousel};
