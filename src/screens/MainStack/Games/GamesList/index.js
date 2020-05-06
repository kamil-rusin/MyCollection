import React, { useState, useEffect, useCallback } from 'react';
import database from '@react-native-firebase/database';
import GeneralList from '../../_components/GeneralList';
import { GAME_TYPE } from '../../_utils/constants';

const GamesScreen = props => {
  const [games, setGames] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const goToDetails = useCallback(() => {
    props.navigation.navigate('GameDetails');
  }, [props.navigation]);

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
    />
  );
};

export default GamesScreen;
