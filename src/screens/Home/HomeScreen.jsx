import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {LoadingSpinner} from '../../components/LoadingSpinner';
import React from 'react';
import {VideoPlayer} from '../../components/VideoPlayer';
import {useHomeScreen} from '../../hooks/useHomeScreen';

export const HomeScreen = () => {

  const {
    validCarousels,
    error,
    refreshing,
    hasData,
    isLoading,
    onRefresh,
    keyExtractor,
    renderItem,
  } = useHomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0a" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Toolbox Carousels</Text>
      </View>

      {isLoading && !refreshing ? (
        <LoadingSpinner
          size="large"
          text="Loading content..."
          variant="large"
        />
      ) : !hasData ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
             No video content available
          </Text>
          {error && (
            <Text style={styles.errorText}>
              Error: {error}
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            data={validCarousels}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#6366f1"
                colors={['#6366f1']}
                progressBackgroundColor="#111111"
                title="Updating..."
                titleColor="#9ca3af"
              />
            }
            showsVerticalScrollIndicator={false}
            initialNumToRender={4}
            windowSize={5}
            maxToRenderPerBatch={4}
            updateCellsBatchingPeriod={50}
            removeClippedSubviews
          />
        </View>
      )}

      <VideoPlayer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#0a0a0a'},
  header: {
    backgroundColor: '#111111',
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#1f1f1f',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 14,
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: '400',
  },
  listContainer: {
    flex: 1,
  },
});
