import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import NicknameScreen from './screens/NicknameScreen';

const RootStack = createStackNavigator();
// Main Stack Navigator
const MainStack = createStackNavigator();
const LoginModalStack = createStackNavigator();

// メイン画面
function MainStackScreen() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#255987',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          headerTitleAlign: 'center',
        },
      }}
    >
      <MainStack.Screen
        name="Main"
        component={MainScreen}
      />
    </MainStack.Navigator>
  );
}

// ログインモーダル
function LoginStackScreen() {
  return (
    <LoginModalStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginModalStack.Screen name="Login" component={LoginScreen} />
      <LoginModalStack.Screen name="Nickname" component={NicknameScreen} />
    </LoginModalStack.Navigator>
  );
}

const AppNavigator = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="LoginModalStack"
        component={LoginStackScreen}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          headerShown: false,
        }}
      />
      <RootStack.Screen
        name="MainStack"
        component={MainStackScreen}
        options={{
          presentation: 'modal',
          animationTypeForReplace: 'pop',
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default AppNavigator;