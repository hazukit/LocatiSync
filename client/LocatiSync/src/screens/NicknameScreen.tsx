import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const NicknameScreen = () => {
  const [nickname, setNickname] = useState('');
  const [isSaving, setIsSaving] = useState(false); // 保存中かどうかの状態

  // Firestore にニックネームを保存する関数
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
        Alert.alert('成功', 'ニックネームが保存されました');
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
      <Text style={styles.title}>ニックネームの入力</Text>
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