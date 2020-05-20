import React, { useState, useEffect, useCallback, useMemo } from 'react';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import GeneralList from '../../_components/GeneralList';
import {
  ALL_ITEMS,
  MOVIE_TYPE,
  NOT_FINISHED,
  ONLY_FINISHED
} from '../../../_constants/types';

const MoviesScreen = props => {
  const userId = auth().currentUser.uid;
  const [movies, setMovies] = useState(null);
  const [finishedMovies, setFinishedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [moviesStatus, setMoviesStatus] = useState(ALL_ITEMS);
  const [searchValue, setSearchValue] = useState('');

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

  const pushMovieToFinished = useCallback(
    itemKey => {
      try {
        database()
          .ref(`/favourites/${userId}/movies`)
          .update({ [itemKey]: itemKey });
      } catch (err) {
        console.log('Error while pushing to finished.');
      }
    },
    [userId]
  );

  const removeMovieFromFinished = useCallback(
    itemKey => {
      try {
        database()
          .ref(`/favourites/${userId}/movies/${itemKey}`)
          .remove();
      } catch (err) {
        console.log('Error while removing from finished.');
      }
    },
    [userId]
  );

  const handleItemStatus = useCallback(
    (isFinished, itemKey) => {
      isFinished
        ? removeMovieFromFinished(itemKey)
        : pushMovieToFinished(itemKey);
    },
    [pushMovieToFinished, removeMovieFromFinished]
  );

  useEffect(() => {
    const subscriber2 = database()
      .ref(`/movies`)
      .on('value', snapshot => {
        try {
          let tempMovies = [];

          snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;

            tempMovies.push(item);
          });

          setMovies(tempMovies);
          console.log('Movies data: ', tempMovies);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      });
    return () => subscriber2();
  }, []);

  useEffect(() => {
    const subscriber = database()
      .ref(`/favourites/${userId}/movies`)
      .on('value', snapshot => {
        try {
          let tempFinishedMovies = [];

          snapshot.forEach(childSnapshot => {
            tempFinishedMovies.push(childSnapshot.key);
          });

          setFinishedMovies(tempFinishedMovies);

          console.log('Finished movies data: ', tempFinishedMovies);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      });
    return () => subscriber();
  }, [userId]);

  const data = useMemo(() => {
    if (moviesStatus === ONLY_FINISHED) {
      let result = movies.filter(movie => finishedMovies.includes(movie.key));
      searchValue &&
        (result = result.filter(movie =>
          movie.title.toLowerCase().includes(searchValue.toLowerCase())
        ));
      return result;
    } else if (moviesStatus === NOT_FINISHED) {
      let result = movies.filter(movie => !finishedMovies.includes(movie.key));
      searchValue &&
        (result = result.filter(movie =>
          movie.title.toLowerCase().includes(searchValue.toLowerCase())
        ));
      return result;
    }
    return searchValue
      ? movies.filter(movie =>
          movie.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : movies;
  }, [finishedMovies, movies, moviesStatus, searchValue]);

  return (
    <GeneralList
      type={MOVIE_TYPE}
      data={data}
      finishedItems={finishedMovies}
      isLoading={isLoading}
      goToDetails={goToDetails}
      handleItemStatus={handleItemStatus}
      deleteItem={deleteItem}
      navigation={props.navigation}
      setItemsStatus={setMoviesStatus}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};

export default MoviesScreen;
