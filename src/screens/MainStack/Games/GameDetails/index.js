import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import AddEdit from '../../_components/AddEdit';
import { GAME_TYPE } from '../../_utils/constants';

const GameDetailsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AddEdit
      url={''}
      title={''}
      details={''}
      type={GAME_TYPE}
      isLoading={isLoading}
      urlLoading={false}
    />
  );
};

export default GameDetailsScreen;
