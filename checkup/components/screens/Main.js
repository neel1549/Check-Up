import React from 'react';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location';
import auth from '@react-native-firebase/auth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
//Maps API Key:AIzaSyAtBj_iX2WW2bYNKg1iyB5b1fEphwYrjzw
const Main = (props) => {
  const logout = () => {
    console.log('hello');
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    props.navigation.goBack();
  };

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then((location) => {
      console.log(location);
    })
    .catch((error) => {
      const {code, message} = error;
      console.warn(code, message);
    });

  //Hard Coded to Saratoga, but the Get Location Library should give us the information we need
  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.2638,
          longitude: -122.023,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
      <TouchableOpacity>
        <Button title={'Logout'} color="orange" onPress={logout} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Main;
