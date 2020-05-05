import {
  BOOK_AVATAR,
  BOOK_TYPE,
  GAME_AVATAR,
  GAME_TYPE,
  MOVIE_AVATAR,
  MOVIE_TYPE
} from './constants';

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
