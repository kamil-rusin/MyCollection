import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, IconButton, Menu } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { ALL_ITEMS, NOT_FINISHED, ONLY_FINISHED } from '../_utils/constants';

const HeaderMenu = props => {
  const [visible, setVisible] = useState(true);
  const { setItemsStatus } = props;

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.warn('User signed out!'));
  };

  return (
    <View style={styles.menuContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="menu" color="white" size={30} onPress={openMenu} />
        }>
        <Menu.Item
          onPress={() => {
            setItemsStatus(ONLY_FINISHED);
          }}
          title="Show only finished"
        />
        <Menu.Item
          onPress={() => {
            setItemsStatus(NOT_FINISHED);
          }}
          title="Show not finished"
        />
        <Menu.Item
          onPress={() => {
            setItemsStatus(ALL_ITEMS);
          }}
          title="Show all"
        />
        <Divider />
        <Menu.Item onPress={signOut} title="Sign out" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

export default HeaderMenu;
