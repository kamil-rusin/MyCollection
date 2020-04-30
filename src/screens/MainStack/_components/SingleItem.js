import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SingleItem = props => {
  const { item } = props;

  //item: {download_url : string, author: string, publisher: string}

  return (
    <View style={styles.listItem}>
      <Image style={styles.image} source={{ uri: item.download_url }} />
      <View style={styles.detailsContainer}>
        <View style={styles.row}>
          <Text style={styles.author}>{item.author}</Text>
          <MaterialCommunityIcons
            size={18}
            name={'star'}
            color={'#ffd70a'}
            style={styles.starIcon}
          />
        </View>
        <Text style={styles.website}>Url: {item.url}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1d548b',
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
    marginBottom: 2,
    marginRight: 10
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  website: {
    fontSize: 13,
    color: '#606060'
  },
  starIcon: {
    marginLeft: 'auto',
    width: 38,
    height: 38,
    marginBottom: 5
  },
  image: {
    margin: 5,
    borderRadius: 10,
    width: 80,
    height: 80
  }
});

export default SingleItem;
