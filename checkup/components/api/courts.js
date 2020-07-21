import axios from 'react-native-axios';
import firestore from '@react-native-firebase/firestore';
export function courts(location) {
  axios
    .get('http://localhost:4001/courts', {
      params: {
        location:
          location.latitude.toString() + ',' + location.longitude.toString(),
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export async function firebaseCourts(court) {
  console.log(court);
  const key =
    court[2].location.lng.toString() + ',' + court[2].location.lat.toString();
  const doc = await firestore().collection('Courts').doc(key).get();

  if (doc['_data'] !== undefined) {
    console.log(doc);
  } else {
    firestore()
      .collection('Courts')
      .doc(key)
      .set({
        Name: court[0],
        Address: court[1],
        Location: key,
        Queue: [],
      })
      .then(() => {
        console.log('Court added!');
      });
  }
}
