import React, { useState, useEffect } from 'react';
import GeneralList from '../../_components/GeneralList';
import { MOVIE_TYPE } from '../../_utils/constants';
import database from '@react-native-firebase/database';

const MoviesScreen = () => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscriber = database()
      .ref(`/movies`)
      .on('value', snapshot => {
        let tempMovies = [];

        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;

          tempMovies.push(item);
        });

        setMovies(tempMovies);
        setIsLoading(false);
        console.log('Movies data: ', tempMovies);
      });
    return () => subscriber();
  }, []);

  return <GeneralList type={MOVIE_TYPE} data={movies} isLoading={isLoading} />;
};

export default MoviesScreen;
