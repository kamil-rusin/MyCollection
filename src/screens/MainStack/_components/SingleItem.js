import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { returnProperColor, returnProperImage } from '../_utils/checkTypes';
import { Surface } from 'react-native-paper';

const SingleItem = props => {
  const {
    isFinished,
    item,
    handleItemStatus,
    type,
    onClicked,
    onLongPress
  } = props;

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
            <Text numberOfLines={2} ellipsizeMode={'tail'} style={styles.title}>
              {item.title}
            </Text>
            <TouchableOpacity
              onPress={() => handleItemStatus(isFinished, item.key)}
              style={styles.checkboxIcon}>
              <MaterialCommunityIcons
                size={32}
                name={
                  isFinished ? 'check-box-outline' : 'checkbox-blank-outline'
                }
              />
            </TouchableOpacity>
          </View>
          <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.details}>
            {item.details}
          </Text>
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
    marginRight: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: Dimensions.get('window').width - 130
  },
  details: {
    fontSize: 14,
    maxWidth: Dimensions.get('window').width - 130
  },
  checkboxIcon: {
    marginLeft: 'auto'
  },
  image: {
    margin: 5,
    width: 60,
    height: 60
  }
});

export default SingleItem;
