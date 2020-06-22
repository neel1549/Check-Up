import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

const Login = (props) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  GoogleSignin.configure({
    webClientId:
      '561256439905-qeopqabu0bss9cj6mkbo7qm1j6k1ci0h.apps.googleusercontent.com',
  });

  function onAuthStateChanged(user) {
    if (user) {
      props.navigation.replace('Home');
    }
  }

  // Hook to detect if there's been a shift in authentication
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //Google Button boiler plate handle Sign in
  async function onGoogleButtonPress() {
    console.log('hello');
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('Signed in With Google');

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    console.log('helllo');
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  // Sign the user in traditionally with username and password
  const authenticate = () => {
    auth()
      .signInWithEmailAndPassword(user, password)
      .then(
        (value) => {
          console.log(value);
          // If a success, navigate to the Main page
          props.navigation.navigate('Home');
        },
        (reason) => {
          console.log(reason);
          alert(reason);
          // rejection
        },
      );
  };

  const register = () => {
    props.navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Check-Up</Text>

      <View>
        <TextInput
          value={user}
          onChangeText={(username) => setUser(username)}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={authenticate}>
          <Button title={'Login'} color="orange" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={register}>
          <Button title={'Register'} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            onFacebookButtonPress()
              .then(() => console.log('Signed in with Facebook!'))
              .catch(function (reason) {
                console.log(reason);
              });
          }}>
          <Button title="Facebook Sign-In" />
        </TouchableOpacity>

        <GoogleSigninButton
          style={styles.button}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => {
            onGoogleButtonPress()
              .then(console.log('Signed in with Google'))
              .catch(function (reason) {
                console.log(reason);
              });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 45,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Courier',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default Login;
