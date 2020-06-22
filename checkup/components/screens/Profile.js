import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const Profile = (props) => {
  Icon.loadFont();
  return (
    <View>
      <Icon name="plus" size={20} />
      <Text>Profile</Text>
    </View>
  );
};
export default Profile;
