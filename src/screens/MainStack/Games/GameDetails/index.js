import React, { useState, useEffect, useCallback } from 'react';
import database from '@react-native-firebase/database';
import AddEdit from '../../_components/AddEdit';
import { GAME_TYPE } from '../../../_constants/types';
import { returnProperImage } from '../../_utils/checkTypes';

const GameDetailsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [imagePath, setImagePath] = useState(returnProperImage('', GAME_TYPE));
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState(false);

  const { navigation } = props;
  const { key } = props.route.params;

  const showSnackbar = useCallback(text => {
    setSnackbarText(text);
    setIsSnackbarVisible(true);
  }, []);

  const onDismissSnackbar = useCallback(() => {
    setIsSnackbarVisible(false);
  }, []);

  useEffect(() => {
    try {
      if (key) {
        setIsLoading(true);
        database()
          .ref(`/games/${key}`)
          .once('value')
          .then(snapshot => {
            setTitle(snapshot.val().title);
            setDetails(snapshot.val().details);
            setUrl(snapshot.val().download_url);
            checkImageURL(snapshot.val().download_url);
            setIsLoading(false);
          });
      }
    } catch (error) {
      setIsLoading(false);
      showSnackbar('Error while loading the game!');
    }
  }, [key, showSnackbar]);

  const checkImageURL = testUrl => {
    setUrlLoading(true);
    fetch(testUrl)
      .then(res => {
        if (!res.ok === 200) {
          setImagePath(returnProperImage('', GAME_TYPE));
        } else {
          setImagePath({ uri: testUrl });
        }
      })
      .catch(err => {
        setImagePath(returnProperImage('', GAME_TYPE));
      });
    setUrlLoading(false);
  };

  const pushToDb = useCallback(() => {
    try {
      if (details && title && url) {
        setUrlLoading(true);
        const newReference = database()
          .ref('/games')
          .push();
        newReference
          .set({
            title: title,
            details: details,
            download_url: url
          })
          .then(() => {
            showSnackbar('Successfully added the game!');
            setTimeout(navigation.goBack, 3000);
          });
      }
    } catch (err) {
      showSnackbar('Error while adding the game!');
    } finally {
      setUrlLoading(false);
    }
  }, [details, navigation, showSnackbar, title, url]);

  const updateInDb = useCallback(
    itemKey => {
      try {
        if (details && title && url) {
          database()
            .ref(`/games/${itemKey}`)
            .update({
              title: title,
              details: details,
              download_url: url
            })
            .then(() => showSnackbar('Game updated!'));
        }
      } catch (err) {
        showSnackbar('Error while updating the game!');
      } finally {
        setUrlLoading(false);
      }
    },
    [details, showSnackbar, title, url]
  );

  const onSave = useCallback(() => {
    key ? updateInDb(key) : pushToDb();
  }, [key, pushToDb, updateInDb]);

  return (
    <AddEdit
      url={url}
      imagePath={imagePath}
      title={title}
      details={details}
      setUrl={setUrl}
      setTitle={setTitle}
      setDetails={setDetails}
      snackbarText={snackbarText}
      type={GAME_TYPE}
      isLoading={isLoading}
      isSnackbarVisible={isSnackbarVisible}
      urlLoading={urlLoading}
      navigation={navigation}
      onDismissSnackbar={onDismissSnackbar}
      onSave={onSave}
      onTest={checkImageURL}
    />
  );
};

export default GameDetailsScreen;
