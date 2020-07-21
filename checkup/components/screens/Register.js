import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      <Text style={styles.header}>Check-Up Registration</Text>

      <View>
        <TextInput
          value={name}
          onChangeText={(name) => setName(name)}
          placeholder={'Name'}
          style={styles.input}
        />
        <TextInput
          value={email}
          onChangeText={(email) => setEmail(email)}
          placeholder={'Email'}
          style={styles.input}
        />
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

        <TouchableOpacity style={styles.button} onPress={registration}>
          <Button title={'Register'} color="orange" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
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
    width: 300,
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
