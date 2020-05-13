import React, { useState, useEffect, useCallback, useMemo } from 'react';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';
import GeneralList from '../../_components/GeneralList';
import {
  ALL_ITEMS,
  GAME_TYPE,
  NOT_FINISHED,
  ONLY_FINISHED
} from '../../_utils/constants';
// import { FirebaseApp as firebase } from '@react-native-firebase/auth';

const GamesScreen = props => {
  // const userId = firebase.auth().currentUser.uid;
  const userId = 'user123';
  const [games, setGames] = useState(null);
  const [finishedGames, setFinishedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gamesStatus, setGamesStatus] = useState(ALL_ITEMS);

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

  const pushGameToFinished = useCallback(itemKey => {
    try {
      database()
        .ref(`/favourites/${userId}/games`)
        .update({ [itemKey]: itemKey });
    } catch (err) {
      console.warn('Error while removing from finished.');
    }
  }, []);

  const removeGameFromFinished = useCallback(itemKey => {
    try {
      database()
        .ref(`/favourites/${userId}/games/${itemKey}`)
        .remove();
    } catch (err) {
      console.warn('Error while removing from finished.');
    }
  }, []);

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
        let tempGames = [];

        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;

          tempGames.push(item);
        });

        setGames(tempGames);
        setIsLoading(false);
        console.log('Games data v2: ', tempGames);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = database()
      .ref(`/favourites/${userId}/games`)
      .on('value', snapshot => {
        let tempFinishedGames = [];

        snapshot.forEach(childSnapshot => {
          tempFinishedGames.push(childSnapshot.key);
        });

        setFinishedGames(tempFinishedGames);
        setIsLoading(false);
        console.log('Finished games data: ', tempFinishedGames);
      });
    return () => subscriber();
  }, []);

  const data = useMemo(() => {
    if (gamesStatus === ONLY_FINISHED) {
      return games.filter(game => finishedGames.includes(game.key));
    } else if (gamesStatus === NOT_FINISHED) {
      return games.filter(game => !finishedGames.includes(game.key));
    }
    return games;
  }, [finishedGames, games, gamesStatus]);

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
    />
  );
};

export default GamesScreen;
