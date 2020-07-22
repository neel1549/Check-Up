import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SocialIcon, Button} from 'react-native-elements';

const Login = (props) => {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const registration = () => {
    console.log('hello');
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        firestore().collection('Users').doc(auth().currentUser.uid).set({
          name: name,
          email: email,
          username: user,
        });
        alert('Check your email for verification');

        auth()
          .currentUser.sendEmailVerification()
          .then(() => {});
        props.navigation.navigate('Main');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri:
            'https://images.unsplash.com/photo-1567939212041-672e42138104?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        }}
        style={styles.backgroundImage}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 40,
              color: 'white',
              fontFamily: 'AvenirNext-Medium',
              alignItems: 'center',
              opacity: 0.7,
              top: 100,
            }}>
            Check Up
          </Text>
          <View style={styles.input}>
            <TextInput
              value={name}
              onChangeText={(usname) => setName(usname)}
              placeholder={'Name'}
              style={styles.inputBox}
              placeholderTextColor="white"
            />
            <TextInput
              value={email}
              onChangeText={(em) => setEmail(email)}
              placeholder={'Email'}
              style={styles.inputBox}
              placeholderTextColor="white"
            />
            <TextInput
              value={user}
              onChangeText={(username) => setUser(username)}
              placeholder={'Username'}
              style={styles.inputBox}
              placeholderTextColor="white"
            />
            <TextInput
              value={password}
              onChangeText={(pass) => setPassword(pass)}
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.inputBox}
              placeholderTextColor="white"
            />
            <TouchableOpacity style={styles.button} onPress={registration}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => props.navigation.replace('Login')}>
              <Text style={styles.signupButton}> Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    top: 150,
    alignItems: 'center',

    width: 450,
    height: 50,
    color: 'white',
    opacity: 0.8,
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    width: 300,
    height: 50,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 40,
    paddingVertical: 13,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

  inputBox: {
    width: 340,
    height: 50,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
});

export default Login;
