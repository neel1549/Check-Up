import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {
  createStackNavigator,
  createDrawerNavigator,
} from '@react-navigation/stack';
import Login from './components/screens/Login';
import SplashScreen from 'react-native-splash-screen';
import Loading from './components/screens/Loading';
import Register from './components/screens/Register';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeRouter from './components/screens/HomeRouter';

export default function App() {
  Icon.loadFont();
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Home"
          component={HomeRouter}
          options={({navigation}) => ({
            headerLeft: () => (
              <Icon
                name="bars"
                size={20}
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
