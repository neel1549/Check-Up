import React, {useState, useEffect} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const Loading = (props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [animated, setAnimated] = useState(true);

  console.log(initializing);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    setAnimated(false);

    if (initializing) setInitializing(false);
  }

  // React Hook to check when authentication state and re-render when firebase comes back
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    console.log(subscriber);

    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <LinearGradient colors={['#FDB813', '#88d3ce']} style={styles.container}>
      <View style={styles.container}>
        <Text> Check-Up</Text>
        {animated && <ActivityIndicator size="large" />}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loading;
