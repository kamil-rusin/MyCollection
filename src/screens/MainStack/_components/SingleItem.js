import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { returnProperImage } from '../_utils/checkTypes';

const SingleItem = props => {
  const { item, type, onClicked } = props;

  return (
    <TouchableOpacity onPress={() => onClicked(item.key)}>
      <View style={styles.listItem}>
        <Image
          style={styles.image}
          source={returnProperImage(item.download_url, type)}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <Text style={styles.title}>{item.title}</Text>
            <MaterialCommunityIcons
              size={32}
              name={'star'}
              color={'#ffd70a'}
              style={styles.starIcon}
            />
          </View>
          <Text style={styles.publisher}>{item.publisher}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#80BDFF',
    flexDirection: 'row',
    marginBottom: 3,
    margin: 5
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
  publisher: {
    fontSize: 14,
    color: '#606060'
  },
  starIcon: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    marginBottom: 0
  },
  image: {
    margin: 5,
    borderRadius: 10,
    width: 60,
    height: 60
  }
});

export default SingleItem;
