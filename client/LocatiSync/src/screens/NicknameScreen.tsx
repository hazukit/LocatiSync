import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { getNickname } from '../firebaseUtils';

const NicknameScreen = () => {
  const [nickname, setNickname] = useState('');
  const [isSaving, setIsSaving] = useState(false); // 保存中かどうかの状態
  const navigation = useNavigation();

  // ユーザーのニックネームをチェック
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const nickname = await getNickname();
        if (nickname) {
          setNickname(nickname);
        }
      } catch (error) {
        console.error('ニックネーム取得エラー:', error);
      }
    };

    fetchNickname(); // 非同期関数を呼び出す
  }, []);

  // Firestore にニックネームを保存・更新する関数
  const saveNickname = async () => {
    if (nickname.trim() === '') {  // ニックネームが空の時はエラー
      Alert.alert('エラー', 'ニックネームを入力してください');
      return;
    }
    setIsSaving(true); // 保存中に設定
    try {
      const user = auth().currentUser;
      if (user) {
        await firestore()  // Firestoreのインスタンスを取得
          .collection('users')
          .doc(user.uid)
          .set({
            nickname: nickname,
            email: user.email,
          });
        navigation.replace('MainStack');
      } else {
        Alert.alert('エラー', 'ログインされていません');
      }
    } catch (error) {
      console.error('ニックネーム保存エラー:', error);
      Alert.alert('エラー', 'ニックネームの保存に失敗しました');
    } finally {
      setIsSaving(false); // 保存処理終了後に解除
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nickname ? 'ニックネームの変更' : 'ニックネームの入力'}</Text>
      <TextInput
        style={styles.input}
        placeholder="ニックネーム"
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity 
        style={[styles.button, isSaving && styles.disabledButton]} 
        onPress={saveNickname}
        disabled={isSaving} // ボタンの無効化制御
      >
        <Text style={styles.buttonText}>
          {isSaving ? '保存中...' : '保存'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9', // ボタンが無効なときの色
  },
});

export default NicknameScreen;