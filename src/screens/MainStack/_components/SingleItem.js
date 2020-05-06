import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { returnProperColor, returnProperImage } from '../_utils/checkTypes';
import { Surface } from 'react-native-paper';

const SingleItem = props => {
  const { item, type, onClicked, onLongPress } = props;

  return (
    <TouchableOpacity
      onPress={() => onClicked(item.key)}
      onLongPress={() => onLongPress(item.key, item.title)}>
      <Surface
        style={[styles.listItem, { borderColor: returnProperColor(type) }]}>
        <Image
          style={styles.image}
          source={returnProperImage(item.download_url, type)}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            {/*<MaterialCommunityIcons*/}
            {/*  size={32}*/}
            {/*  name={'star'}*/}
            {/*  color={'#ffd70a'}*/}
            {/*  style={styles.starIcon}*/}
            {/*/>*/}
          </View>
          <Text style={styles.details}>{item.publisher}</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 3,
    marginTop: 3,
    margin: 5,
    elevation: 5
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 5
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 0,
    marginRight: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  details: {
    fontSize: 14
  },
  starIcon: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    marginBottom: 0
  },
  image: {
    margin: 5,
    width: 60,
    height: 60
  }
});

export default SingleItem;
