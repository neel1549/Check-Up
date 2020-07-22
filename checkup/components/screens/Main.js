import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Button, Card, Title, Paragraph, List} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlacesInput from 'react-native-places-input';
import axios from 'react-native-axios';
import {firebaseCourts} from '../api/courts';
import StreetView from 'react-native-streetview';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibmVlbGtrIiwiYSI6ImNrY2NoaW85bzA0bnMyem54ZnRoNXo3NWQifQ.8YM4J2KD1rR8BABC34Yvww',
);
navigator.geolocation = require('@react-native-community/geolocation');

const Main = (props) => {
  let camera = {};
  Icon.loadFont();
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [location, setLocation] = useState({
    longitude: -122.023,
    latitude: 37.2638,
  });
  const [courts, setCourts] = useState();
  const [selectedCourt, setSelectedCourt] = useState([]);
  const [streetView, setStreetView] = useState(false);
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
  useEffect(() => {
    console.log('hello');
    axios
      .get('http://localhost:4001/courts', {
        params: {
          location:
            location.latitude.toString() + ',' + location.longitude.toString(),
        },
      })
      .then(function (response) {
        setCourts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [location]);

  const renderMarkers = () => {
    console.log(courts);
    return courts.map((court, index) => {
      console.log(court[2].location);
      return (
        <MapboxGL.PointAnnotation
          id={index.toString()}
          coordinate={[court[2].location.lng, court[2].location.lat]}
          onSelected={() => {
            camera.zoomTo(15);
            camera.flyTo([court[2].location.lng, court[2].location.lat]);
          }}
          title="">
          <MapboxGL.Callout title={court[0]}>
            <View
              style={{
                width: 200,
                height: 100,
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'white',
                opacity: 0.7,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 18,
                  fontStyle: 'oblique',
                  fontFamily: 'Arial',
                }}>
                {court[0]}
              </Text>
              <Button
                mode="contained"
                onPress={() => {
                  firebaseCourts(court);
                  setSelectedCourt(court);
                }}
                style={{height: 40}}>
                Learn More
              </Button>
            </View>
          </MapboxGL.Callout>
        </MapboxGL.PointAnnotation>
      );
    });
  };

  //Hard Coded to Saratoga, but the Get Location Library should give us the information we need
  return (
    <View style={styles.container}>
      <View style={{zIndex: 5}}>
        <PlacesInput
          googleApiKey={'AIzaSyDlQf8TSET_y620Z1CYltuN0wPDdXTophg'}
          placeHolder={'Find a Court'}
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
          zoomEnabled={true}>
          <MapboxGL.Camera
            ref={(ref) => (camera = ref)}
            zoomLevel={12}
            centerCoordinate={[location.longitude, location.latitude]}
          />

          {courts ? renderMarkers() : null}

          <MapboxGL.UserLocation visible={true} />
        </MapboxGL.MapView>
      </View>
      {selectedCourt.length > 0 ? (
        <View>
          <Card>
            <Card.Cover source={{uri: 'https://picsum.photos/750'}} />
            <Card.Content>
              <Title>{selectedCourt[0]}</Title>
              <Paragraph>{selectedCourt[1]}</Paragraph>

              <List.Accordion
                title="Teams in the Queue"
                left={(props) => <List.Icon {...props} icon="folder" />}>
                <List.Item title="Team 1" />
                <List.Item title="Team 2" />
              </List.Accordion>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => setStreetView(true)}>Street View</Button>
              <Button
                onPress={() => {
                  setStreetView(false);
                  setSelectedCourt([]);
                }}>
                Cancel
              </Button>
            </Card.Actions>
          </Card>
        </View>
      ) : null}
      {streetView ? (
        <View style={styles.streetContainer}>
          <StreetView
            style={styles.streetView}
            allGesturesEnabled={true}
            coordinate={{
              latitude: selectedCourt[2].location.lat,
              longitude: selectedCourt[2].location.lng,
            }}
          />
        </View>
      ) : null}

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
  streetContainer: {
    flex: 10,
  },
  streetView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  logoutButton: {},
});

export default Main;
