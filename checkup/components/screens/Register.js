import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Login = (props) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const registration = () => {
    console.log('hello');
    auth()
      .createUserWithEmailAndPassword(user, password)
      .then(() => {
        console.log('User account created & signed in!');
        alert('Check your email for verification');
        auth()
          .currentUser.sendEmailVerification()
          .then(() => {});
        props.navigation.navigate('Login');
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
