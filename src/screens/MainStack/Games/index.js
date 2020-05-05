import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import GeneralList from '../_components/GeneralList';
import { GAME_TYPE } from '../_utils/constants';

//item: {id: string, download_url : string, title: string, publisher: string}
const gamesList = [
  {
    id: '123',
    download_url:
      'https://c-sf.smule.com/sf/s26/arr/d2/51/fe94c92f-b7bf-4f29-aee5-5fc99bef9a0f.jpg',
    title: 'Witcher 3: Wild Hunt',
    publisher: 'CD Projekt RED'
  },
  {
    id: '123',
    download_url:
      'https://s3.amazonaws.com/media.muckrack.com/profile/images/9492864/24608-coffin-dance-viral-.jpg.256x256_q100_crop-smart.jpg',
    title: 'Coffin 1',
    publisher: 'Africa'
  },
  {
    id: '123',
    download_url: '',
    title: 'Coffin 2',
    publisher: 'Africa'
  }
];

const GamesScreen = () => {
  const [games, setGames] = useState(null);

  useEffect(() => {
    database()
      .ref(`/games/`)
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
      });
  }, []);
  return <GeneralList type={GAME_TYPE} data={gamesList} />;
};

export default GamesScreen;
