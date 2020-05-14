import {
  BOOK_AVATAR,
  BOOK_COLOR,
  BOOK_TYPE,
  GAME_AVATAR,
  GAME_COLOR,
  GAME_TYPE,
  MOVIE_AVATAR,
  MOVIE_COLOR,
  MOVIE_TYPE
} from '../../_constants/types';

export const returnProperImage = (uri, type) => {
  if (uri) return { uri: uri };
  switch (type) {
    case BOOK_TYPE:
      return BOOK_AVATAR;
    case GAME_TYPE:
      return GAME_AVATAR;
    case MOVIE_TYPE:
      return MOVIE_AVATAR;
    default:
      return '';
  }
};

export const returnProperColor = type => {
  switch (type) {
    case BOOK_TYPE:
      return BOOK_COLOR;
    case GAME_TYPE:
      return GAME_COLOR;
    case MOVIE_TYPE:
      return MOVIE_COLOR;
    default:
      return '#7B1FA2';
  }
};

export const returnDetailsLabel = type => {
  switch (type) {
    case BOOK_TYPE:
      return 'Author';
    case GAME_TYPE:
      return 'Creator';
    case MOVIE_TYPE:
      return 'Director';
    default:
      return 'Details';
  }
};
