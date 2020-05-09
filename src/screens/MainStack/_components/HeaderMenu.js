import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Divider, IconButton, Menu } from 'react-native-paper';

const HeaderMenu = props => {
  const [visible, setVisible] = useState(true);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.menuContainer}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="menu" color="white" size={30} onPress={openMenu} />
        }>
        <Menu.Item onPress={() => {}} title="Show favourites" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Sign out" />
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
