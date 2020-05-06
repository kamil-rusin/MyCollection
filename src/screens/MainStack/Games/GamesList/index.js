import React, { useState, useEffect, useCallback } from 'react';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';
import GeneralList from '../../_components/GeneralList';
import { GAME_TYPE } from '../../_utils/constants';

const GamesScreen = props => {
  const [games, setGames] = useState(null);
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

  return (
    <GeneralList
      type={GAME_TYPE}
      data={games}
      isLoading={isLoading}
      goToDetails={goToDetails}
      deleteItem={deleteItem}
    />
  );
};

export default GamesScreen;
