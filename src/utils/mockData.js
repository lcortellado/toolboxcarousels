// Datos de ejemplo para testing local
// Este archivo puede ser usado para desarrollo sin depender del API

export const mockCarouselData = [
  {
    title: 'Carrusel Thumb',
    type: 'thumb',
    items: [
      {
        title: 'Movie 1',
        imageUrl: 'https://picsum.photos/640/480?random=1',
        videoUrl: 'https://tbx-enc-tests.s3.amazonaws.com/test/m3u8/test.m3u8',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        title: 'Movie 2',
        imageUrl: 'https://picsum.photos/640/480?random=2',
        videoUrl: 'https://tbx-enc-tests.s3.amazonaws.com/test/m3u8/test.m3u8',
        description:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        title: 'Movie 3',
        imageUrl: 'https://picsum.photos/640/480?random=3',
        videoUrl: null, // No video to test error handling
        description:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  },
  {
    title: 'Carrusel Poster',
    type: 'poster',
    items: [
      {
        title: 'Featured Movie 1',
        imageUrl: 'https://picsum.photos/320/480?random=4',
        videoUrl: 'https://tbx-enc-tests.s3.amazonaws.com/test/m3u8/test.m3u8',
        description:
          'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        title: 'Featured Movie 2',
        imageUrl: 'https://picsum.photos/320/480?random=5',
        videoUrl: 'https://tbx-enc-tests.s3.amazonaws.com/test/m3u8/test.m3u8',
        description:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      },
      {
        title: 'Featured Movie 3',
        imageUrl: 'https://picsum.photos/320/480?random=6',
        videoUrl: 'https://tbx-enc-tests.s3.amazonaws.com/test/m3u8/test.m3u8',
        description:
          'Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
      },
      {
        title: 'Featured Movie 4',
        imageUrl: 'https://picsum.photos/320/480?random=7',
        videoUrl: 'https://tbx-enc-tests.s3.amazonaws.com/test/m3u8/test.m3u8',
        description:
          'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
      },
    ],
  },
];

export const mockLoginResponse = {
  sub: 'ToolboxMobileTest',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJUb29sYm94TW9iaWxlVGVzdCIsIm5hbWUiOiJUb29sYm94IEF1dGggdGVzdCIsImlhdCI6MTYzMjE1ODQ3OCwiZXhwaXJlRGF0ZSI6IjIwMjEtMDktMjBUMTc6MjE6MTguMjY1WiJ9.gNzKZKPizOTchSbL46gq7zRWkhA8jYcFUEKuIG0eLkg',
  type: 'Bearer',
};
