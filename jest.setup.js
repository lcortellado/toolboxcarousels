// Mock react-native-video
jest.mock('react-native-video', () => 'Video');

// Mock react-native-fast-image
jest.mock('react-native-fast-image', () => {
  const React = require('react');
  const MockFastImage = React.forwardRef((props, ref) => {
    return React.createElement('FastImage', {...props, ref});
  });

  MockFastImage.priority = {
    normal: 'normal',
    high: 'high',
    low: 'low',
  };
  MockFastImage.resizeMode = {
    contain: 'contain',
    cover: 'cover',
    stretch: 'stretch',
    center: 'center',
  };

  return MockFastImage;
});

// Mock base-64
jest.mock('base-64', () => ({
  decode: jest.fn(() => '{}'),
}));
