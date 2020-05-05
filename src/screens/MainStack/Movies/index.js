import React from 'react';
import GeneralList from '../_components/GeneralList';
import { MOVIE_TYPE } from '../_utils/constants';

const MoviesScreen = () => {
  return <GeneralList type={MOVIE_TYPE} data={[]} />;
};

export default MoviesScreen;
