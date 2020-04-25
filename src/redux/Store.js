import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import collectionsReducer from './reducers/CollectionsReducer';

const rootReducer = combineReducers({
  collectionsReducer: collectionsReducer
});

const middleware = [thunk];

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(...middleware));

export default configureStore;
