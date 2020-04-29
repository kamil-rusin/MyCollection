import {
  FETCH_DATA_ERROR,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_PENDING,
  UPDATE_USER_DATA,
  UPDATE_ITEM
} from '../constants/Types';

const initialState = {
  pending: false,
  error: null,
  user: {},
  games: [],
  movies: [],
  books: [],
  playedGamesId: [],
  watchedMoviesId: [],
  readBooksId: []
};

const collectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_PENDING:
      return {
        ...state,
        error: null,
        pending: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        pending: false,
        games: action.games,
        movies: action.movies,
        books: action.books
      };
    case FETCH_DATA_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    case UPDATE_USER_DATA:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default collectionsReducer;
