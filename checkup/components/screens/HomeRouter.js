import * as React from 'react';
import {Platform, StyleSheet, Text, Button} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Main from './Main';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();
export default function HomeRouter(props) {
  Icon.loadFont();
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    paddingLeft: 10,
  },
});
