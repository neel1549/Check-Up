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

  const authenticate = () => {
    auth()
      .signInWithEmailAndPassword(user, password)
      .then(
        (value) => {
          console.log(value);
          props.navigation.navigate('Main');
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
