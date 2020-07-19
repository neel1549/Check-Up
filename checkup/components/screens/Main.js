import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibmVlbGtrIiwiYSI6ImNrY2NoaW85bzA0bnMyem54ZnRoNXo3NWQifQ.8YM4J2KD1rR8BABC34Yvww',
);
navigator.geolocation = require('@react-native-community/geolocation');
const Main = (props) => {
  Icon.loadFont();
  const [location, setLocation] = useState({
    longitude: -122.023,
    latitude: 37.2638,
  });
  const logout = () => {
    console.log('hello');
    auth()
      .signOut()
      .then(() => props.navigation.replace('Login'));
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
    ),
      [];
  });

  //Hard Coded to Saratoga, but the Get Location Library should give us the information we need
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        query={{
          key: 'AIzaSyDlQf8TSET_y620Z1CYltuN0wPDdXTophg',

          language: 'en', // language of the results
        }}
        placeholder="Enter Location"
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        onPress={(data, details = null) => {
          console.log(details);
          setLocation({
            longitude: details.geometry.location.lng,
            latitude: details.geometry.location.lat,
          });
        }}
        onFail={(error) => console.error(error)}
        fetchDetails={true}
      />

      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/neelkk/ckcs8yh4z1lnk1iqxx9lvgxut"
          showUserLocation={true}
          zoomLevel={13}
          zoomEnabled={true}
          attributionPosition={{top: 8, left: 8}}>
          <MapboxGL.UserLocation />
          <MapboxGL.UserLocation visible={true} minDisplacement={0} />
          <MapboxGL.Camera
            ref={(c) => (this._mapCamera = c)}
            zoomLevel={12}
            defaultSettings={{
              centerCoordinate: [location.longitude, location.latitude],
            }}
          />
        </MapboxGL.MapView>
      </View>
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
  mapContainer: {
    height: 400,
    width: 400,
    flex: 1,
  },
  searchBar: {flex: 1},
  map: {flex: 1},

  logoutButton: {},
});

export default Main;
