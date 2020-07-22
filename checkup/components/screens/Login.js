import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LoginScreen from 'react-native-login-screen';
import {SocialIcon, Button} from 'react-native-elements';

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
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1567939212041-672e42138104?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        }}
        style={styles.backgroundImage}>
        <View>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 40,
                color: 'white',
                fontFamily: 'AvenirNext-Medium',
                alignItems: 'center',
                opacity: 0.7,
              }}>
              Check Up
            </Text>
          </View>

          <View style={styles.input}>
            <TextInput
              value={user}
              onChangeText={(username) => setUser(username)}
              placeholder={'Username'}
              style={styles.textInput}
              placeholderTextColor="white"
            />
            <TextInput
              value={password}
              onChangeText={(pass) => setPassword(pass)}
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.textInput}
              placeholderTextColor="white"
            />
          </View>
          <View style={styles.button}>
            <View style={styles.registerButton}>
              <TouchableOpacity onPress={register}>
                <Button
                  title="Register"
                  buttonStyle={{
                    borderRadius: 20,
                    width: 150,
                    backgroundColor: 'orange',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.loginButton}>
              <TouchableOpacity onPress={authenticate}>
                <Button
                  title="Login"
                  buttonStyle={{
                    borderRadius: 20,
                    width: 150,
                    backgroundColor: 'orange',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.socialButtons}>
          <TouchableOpacity
            onPress={() => {
              onFacebookButtonPress()
                .then(() => console.log('Signed in with Facebook!'))
                .catch(function (reason) {
                  console.log(reason);
                });
            }}>
            <SocialIcon title="Sign In With Facebook" button type="facebook" />
          </TouchableOpacity>

          <TouchableOpacity>
            <GoogleSigninButton
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
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>

    // <LoginScreen
    //   usernameOnChangeText={(username) => setUser(username)}
    //   passwordOnChangeText={(password) => setPassword(password)}
    //   onPressLogin={() => {
    //     authenticate();
    //   }}
    //   disableSettings={true}
    //   logoComponent={
    //     <Text
    //       style={{fontSize: 40, color: 'white', fontFamily: 'Avenir-Roman'}}>
    //       Check Up
    //     </Text>
    //   }
    //   spinnerEnable={true}
    //   source={{
    //     uri:
    //       'https://images.unsplash.com/photo-1567939212041-672e42138104?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    //   }}>
    //   <View
    //     style={{
    //       position: 'relative',
    //       alignSelf: 'center',
    //       marginTop: 64,
    //     }}>
    //     <Text style={{color: 'white', fontSize: 30}}>
    //       Inside Login Screen Component
    //     </Text>
    //   </View>
    // </LoginScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    top: 45,
    zIndex: 5,
    opacity: 0.9,
  },
  input: {
    top: 440,
    left: 15,
    width: 450,
    height: 50,
    color: 'white',
    opacity: 0.8,
  },
  textInput: {
    width: '80%',
    fontSize: 20,
    backgroundColor: '#465881',
    color: 'white',
    fontFamily: 'AvenirNext-Medium',
    borderRadius: 25,
    height: '80%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    top: 520,
    height: 80,
    left: 45,
    flexDirection: 'row',
  },
  loginButton: {
    marginLeft: 30,
  },

  socialButtons: {
    position: 'absolute',
    top: 750,
    left: 35,
    height: 70,
    opacity: 0.88,
  },
});

export default Login;
