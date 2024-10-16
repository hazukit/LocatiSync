import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import NicknameScreen from './src/screens/NicknameScreen';
import MainScreen from './src/screens/MainScreen';
import AppNavigator from './src/AppNavigator';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};
export default App;
