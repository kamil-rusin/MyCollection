import React, { useState, useEffect, useCallback } from 'react';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';
import GeneralList from '../../_components/GeneralList';
import { GAME_TYPE } from '../../_utils/constants';
// import { FirebaseApp as firebase } from '@react-native-firebase/auth';

const GamesScreen = props => {
  // const userId = firebase.auth().currentUser.uid;
  const userId = 'user123';
  const [games, setGames] = useState(null);
  const [finishedGames, setFinishedGames] = useState([]);
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

  return (
    <GeneralList
      type={GAME_TYPE}
      data={games}
      finishedItems={finishedGames}
      isLoading={isLoading}
      goToDetails={goToDetails}
      deleteItem={deleteItem}
      navigation={props.navigation}
    />
  );
};

export default GamesScreen;
