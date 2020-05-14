import React, { useState, useEffect, useCallback } from 'react';
import database from '@react-native-firebase/database';
import AddEdit from '../../_components/AddEdit';
import { MOVIE_TYPE } from '../../../_constants/types';
import { returnProperImage } from '../../_utils/checkTypes';

const MovieDetailsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [imagePath, setImagePath] = useState(returnProperImage('', MOVIE_TYPE));
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const { navigation } = props;
  const { key } = props.route.params;

  useEffect(() => {
    try {
      if (key) {
        setIsLoading(true);
        database()
          .ref(`/movies/${key}`)
          .once('value')
          .then(snapshot => {
            setTitle(snapshot.val().title);
            setDetails(snapshot.val().director);
            setUrl(snapshot.val().download_url);
            checkImageURL(snapshot.val().download_url);
            setIsLoading(false);
          });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [key]);

  const checkImageURL = testUrl => {
    setUrlLoading(true);
    fetch(testUrl)
      .then(res => {
        if (!res.ok === 200) {
          setImagePath(returnProperImage('', MOVIE_TYPE));
        } else {
          setImagePath({ uri: testUrl });
        }
      })
      .catch(err => {
        setImagePath(returnProperImage('', MOVIE_TYPE));
      });
    setUrlLoading(false);
  };

  const pushToDb = useCallback(() => {
    try {
      if (details && title && url) {
        setUrlLoading(true);
        const newReference = database()
          .ref('/movies')
          .push();
        newReference
          .set({
            title: title,
            director: details,
            download_url: url
          })
          .then(() => console.warn('Data updated.'));
      }
    } catch (err) {
      console.warn('Error while pushing.');
    } finally {
      setUrlLoading(false);
    }
  }, [details, title, url]);

  const updateInDb = useCallback(
    itemKey => {
      try {
        if (details && title && url) {
          database()
            .ref(`/movies/${itemKey}`)
            .update({
              title: title,
              director: details,
              download_url: url
            })
            .then(() => console.warn('Data updated.'));
        }
      } catch (err) {
        console.warn('Error while updating.');
      } finally {
        setUrlLoading(false);
      }
    },
    [details, title, url]
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
      type={MOVIE_TYPE}
      isLoading={isLoading}
      urlLoading={urlLoading}
      navigation={navigation}
      onSave={onSave}
      onTest={checkImageURL}
    />
  );
};

export default MovieDetailsScreen;
