import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import React from 'react';

const LoadingSpinner = ({
  size = 'small',
  color = '#6366f1',
  text = 'Loading...',
  showText = true,
  containerStyle,
  textStyle,
  spinnerStyle,
  variant = 'default', // 'default', 'large', 'minimal'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'large':
        return {
          container: styles.largeContainer,
          spinner: styles.largeSpinner,
          text: styles.largeText,
        };
      case 'minimal':
        return {
          container: styles.minimalContainer,
          spinner: styles.minimalSpinner,
          text: styles.minimalText,
        };
      default:
        return {
          container: styles.defaultContainer,
          spinner: styles.defaultSpinner,
          text: styles.defaultText,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <View style={[variantStyles.container, containerStyle]}>
      <View style={[variantStyles.spinner, spinnerStyle]}>
        <ActivityIndicator size={size} color={color} />
      </View>
      {showText && <Text style={[variantStyles.text, textStyle]}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultSpinner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  defaultText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
    letterSpacing: 0.2,
  },

  largeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  largeSpinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  largeText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  minimalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  minimalSpinner: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  minimalText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});

export {LoadingSpinner};
