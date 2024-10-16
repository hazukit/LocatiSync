import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// ニックネームを取得する関数
export const getNickname = async (): Promise<string> => {
  try {
    const user = auth().currentUser;
    if (user) {
      const userDoc = await firestore()
        .collection('users')
        .doc(user.uid)
        .get();

      if (userDoc.exists && userDoc.data()?.nickname) {
        return userDoc.data().nickname;
      }
    }
    return '';
  } catch (error) {
    console.error('ニックネーム取得エラー:', error);
    return '';
  }
};