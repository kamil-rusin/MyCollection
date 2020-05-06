import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaterialCommunityIconsGlyphs from 'react-native-vector-icons/MaterialCommunityIcons';
import { returnProperColor } from '../_utils/checkTypes';

const EmptyListComponent = props => {
  const primaryColor = returnProperColor(props.type);

  return (
    <View style={styles.informationContainer}>
      <MaterialCommunityIconsGlyphs
        name="view-list"
        color={primaryColor}
        size={80}
      />
      <Text style={[styles.message, { color: primaryColor }]}>
        No items available
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  informationContainer: {
    flex: 1,
    marginBottom: 3,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 18,
    margin: 5
  }
});

export default EmptyListComponent;
