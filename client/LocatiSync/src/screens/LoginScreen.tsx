import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GOOGLE_WEB_CLIENT_ID } from '@env';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigation = useNavigation();

  // Google SignIn の初期設定
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_WEB_CLIENT_ID,
      scopes: ['email'],
    });
  }, []);

  // Google OAuth ログイン
  const onGoogleButtonPress = async () => {
    setIsLoggingIn(true); // ボタンを無効化
    try {
      // Google でサインイン
      const result = await GoogleSignin.signIn();
      const idToken = result?.data?.idToken;  // idToken を取得
      if (!idToken) {
        throw new Error('No ID Token returned');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Firebase で Google サインイン
      const userCredential = await auth().signInWithCredential(googleCredential);
      const email = userCredential.user.email;

      // Gmail アドレスかどうか確認
      if (email && email.endsWith('@gmail.com')) {
        const isInvited = await checkIfInvited(email);
        if (isInvited) {
          navigation.replace('Nickname');
        } else {
          Alert.alert('エラー', 'このアカウントは招待されていません');
          auth().signOut();
        }
      } else {
        Alert.alert('エラー', 'Gmailアカウントでログインしてください');
        auth().signOut();
      }
    } catch (error) {
      console.error('SignIn error:', error);
      Alert.alert('エラー', 'ログインに失敗しました');
    } finally {
      setIsLoggingIn(false); // ボタンを有効化
    }
  };

  // 招待リストに含まれているか確認
  const checkIfInvited = async (email: string) => {
    try {
      const response = await axios.post('https://us-central1-locatisync-8af35.cloudfunctions.net/verifyUserLogin', { email });
      return response.data.message === 'User is invited and authenticated';
    } catch (error) {
      console.error('エラーチェック:', error);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/img/logo.png')} style={styles.logo} />
      <Text style={styles.title}>LocatiSync</Text>
      <TouchableOpacity 
		style={[styles.googleButton, isLoggingIn && styles.disabledButton]}
		onPress={onGoogleButtonPress}
		disabled={isLoggingIn}
		>
        {isLoggingIn ? (
          <Text style={styles.googleButtonText}>ログイン中...</Text> // ログイン中のテキスト
        ) : (
          <Text style={styles.googleButtonText}>Googleでログイン</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  userText: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // ボタンが無効な時の色
  }
});

export default LoginScreen;