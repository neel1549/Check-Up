import React from 'react';
import {Text, View, TouchableOpacity, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
const Main = (props) => {
  const logout = () => {
    console.log('hello');
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    props.navigation.goBack();
  };
  return (
    <View>
      <Text>Main Screen</Text>
      <TouchableOpacity>
        <Button title={'Logout'} color="orange" onPress={logout} />
      </TouchableOpacity>
    </View>
  );
};
export default Main;
