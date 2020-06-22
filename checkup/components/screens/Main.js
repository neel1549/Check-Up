import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location';
import auth from '@react-native-firebase/auth';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
//Maps API Key:AIzaSyAtBj_iX2WW2bYNKg1iyB5b1fEphwYrjzw
const Main = (props) => {
  Icon.loadFont();
  const [location, setLocation] = useState({
    longitude: -122.023,
    latitude: 37.2638,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const logout = () => {
    console.log('hello');
    auth()
      .signOut()
      .then(() => props.navigation.replace('Login'));
  };

  // GetLocation.getCurrentPosition({
  //   enableHighAccuracy: true,
  //   timeout: 15000,
  // })
  //   .then((location) => {
  //     console.log(location);
  //   })
  //   .catch((error) => {
  //     const {code, message} = error;
  //     console.warn(code, message);
  //   });

  //Hard Coded to Saratoga, but the Get Location Library should give us the information we need
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <GooglePlacesAutocomplete
          query={{
            key: 'AIzaSyDlQf8TSET_y620Z1CYltuN0wPDdXTophg',

            language: 'en', // language of the results
          }}
          placeholder="Enter Location"
          GooglePlacesDetailsQuery={{fields: 'geometry'}}
          onPress={(data, details = null) =>
            setLocation({
              longitude: details.geometry.location.lng,
              latitude: details.geometry.location.lat,
              longitudeDelta: 0.0421,
              latitudeDelta: 0.0922,
            })
          }
          onFail={(error) => console.error(error)}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              marginLeft: 0,
              marginRight: 0,
              height: 38,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={location}
        region={location}
      />

      <TouchableOpacity>
        <Button
          title={'Logout'}
          color="orange"
          onPress={logout}
          style={styles.logoutButton}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  searchBar: {flex: 1},
  map: {flex: 1},

  logoutButton: {},
});

export default Main;
