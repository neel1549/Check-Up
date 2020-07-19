import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlacesInput from 'react-native-places-input';

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
    console.log('hello');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      },
    );
  }, []);
  console.log(location);

  //Hard Coded to Saratoga, but the Get Location Library should give us the information we need
  return (
    <View style={styles.container}>
      <View style={{zIndex: 5}}>
        <PlacesInput
          googleApiKey={'AIzaSyDlQf8TSET_y620Z1CYltuN0wPDdXTophg'}
          placeHolder={'Some Place holder'}
          language={'en-US'}
          onSelect={(place) => {
            setLocation({
              latitude: place.result.geometry.location.lat,
              longitude: place.result.geometry.location.lng,
            });

            console.log(place.result.geometry.location);
          }}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL="mapbox://styles/neelkk/ckcs8yh4z1lnk1iqxx9lvgxut"
          zoomLevel={13}
          zoomEnabled={true}>
          <MapboxGL.Camera
            zoomLevel={12}
            centerCoordinate={[location.longitude, location.latitude]}
          />
          <MapboxGL.UserLocation visible={true} />
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
