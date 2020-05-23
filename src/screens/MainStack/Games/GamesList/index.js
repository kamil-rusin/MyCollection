import React, { useState, useEffect, useCallback, useMemo } from 'react';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';
import GeneralList from '../../_components/GeneralList';
import {
  ALL_ITEMS,
  GAME_TYPE,
  NOT_FINISHED,
  ONLY_FINISHED
} from '../../../_constants/types';
import auth from '@react-native-firebase/auth';

const GamesScreen = props => {
  const userId = auth().currentUser.uid;
  const [games, setGames] = useState(null);
  const [finishedGames, setFinishedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gamesStatus, setGamesStatus] = useState(ALL_ITEMS);
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
      'Game',
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
              .ref(`/games/${key}`)
              .remove();
          }
        }
      ],
      { cancelable: true }
    );
  }, []);

  const pushGameToFinished = useCallback(
    itemKey => {
      console.log(itemKey);
      try {
        database()
          .ref(`/favourites/${userId}/games`)
          .update({ [itemKey]: itemKey });
      } catch (err) {
        console.log('Error while pushing to finished.');
      }
    },
    [userId]
  );

  const removeGameFromFinished = useCallback(
    itemKey => {
      try {
        database()
          .ref(`/favourites/${userId}/games/${itemKey}`)
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
        ? removeGameFromFinished(itemKey)
        : pushGameToFinished(itemKey);
    },
    [pushGameToFinished, removeGameFromFinished]
  );

  useEffect(() => {
    const subscriber = database()
      .ref(`/games`)
      .on('value', snapshot => {
        try {
          let tempGames = [];

          snapshot.forEach(childSnapshot => {
            let item = childSnapshot.val();
            item.key = childSnapshot.key;

            tempGames.push(item);
          });

          setGames(tempGames);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = database()
      .ref(`/favourites/${userId}/games`)
      .on('value', snapshot => {
        try {
          let tempFinishedGames = [];

          snapshot.forEach(childSnapshot => {
            tempFinishedGames.push(childSnapshot.key);
          });

          console.log(tempFinishedGames);
          setFinishedGames(tempFinishedGames);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      });
    return () => subscriber();
  }, [userId]);

  const data = useMemo(() => {
    if (gamesStatus === ONLY_FINISHED) {
      let result = games.filter(game => finishedGames.includes(game.key));
      searchValue &&
        (result = result.filter(game =>
          game.title.toLowerCase().includes(searchValue.toLowerCase())
        ));
      return result;
    } else if (gamesStatus === NOT_FINISHED) {
      let result = games.filter(game => !finishedGames.includes(game.key));
      searchValue &&
        (result = result.filter(game =>
          game.title.toLowerCase().includes(searchValue.toLowerCase())
        ));
      return result;
    }
    return searchValue
      ? games.filter(game =>
          game.title.toLowerCase().includes(searchValue.toLowerCase())
        )
      : games;
  }, [finishedGames, games, gamesStatus, searchValue]);

  return (
    <GeneralList
      type={GAME_TYPE}
      data={data}
      finishedItems={finishedGames}
      isLoading={isLoading}
      goToDetails={goToDetails}
      handleItemStatus={handleItemStatus}
      deleteItem={deleteItem}
      navigation={props.navigation}
      setItemsStatus={setGamesStatus}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};

export default GamesScreen;
