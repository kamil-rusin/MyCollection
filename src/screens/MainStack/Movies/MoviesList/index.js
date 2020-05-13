import React, { useState, useEffect, useCallback } from 'react';
import GeneralList from '../../_components/GeneralList';
import { MOVIE_TYPE } from '../../_utils/constants';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';

const MoviesScreen = props => {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const goToDetails = useCallback(
    key => {
      props.navigation.navigate('Details', { key: key });
    },
    [props.navigation]
  );

  const deleteItem = useCallback((key, title) => {
    if (!key) return;
    Alert.alert(
      'Movie',
      `Do you want to delete '${title}' permanently?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            database()
              .ref(`/movies/${key}`)
              .remove();
          }
        }
      ],
      { cancelable: true }
    );
  }, []);

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

  return (
    <GeneralList
      type={MOVIE_TYPE}
      data={movies}
      isLoading={isLoading}
      goToDetails={goToDetails}
      deleteItem={deleteItem}
      navigation={props.navigation}
      searchValue={''}
    />
  );
};

export default MoviesScreen;
