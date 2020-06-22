import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {Icon} from 'react-native-elements';

// pull in from DrawerTrigger.js

class Header extends React.Component {
  render() {
    return (
      <View style={styles.header}>
        <DrawerTrigger />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 40,
    backgroundColor: 'whitesmoke',
  },
});

export default Header;
