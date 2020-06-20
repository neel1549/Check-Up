import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

const Loading = (props) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  const renderAuthentication = () => {
    console.log('Movin');
    if (!user) {
      props.navigation.replace('Login');
    } else {
      props.navigation.navigate('Main');
    }
  };

  useEffect(() => {
    console.log('Hello');
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return <ActivityIndicator size="large" />;

  return <View>{renderAuthentication()}</View>;
};
export default Loading;
