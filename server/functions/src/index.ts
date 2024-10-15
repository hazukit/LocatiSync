import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Firebase Admin SDKの初期化
admin.initializeApp();

// Firestoreの参照を取得
const db = admin.firestore();

// Firestoreのコレクション名
const INVITES_COLLECTION = "invites";

// 招待リストに存在するか確認する関数
const checkIfInvited = async (email: string): Promise<boolean> => {
  const inviteDoc = await db.collection(INVITES_COLLECTION).doc(email).get();

  if (inviteDoc.exists && inviteDoc.data()?.invited === true) {
    return true;
  }

  return false;
};

// Google OAuthログイン後に招待リストを確認するHTTP関数
export const verifyUserLogin = functions.https.onRequest(async (req, res) => {
  const {email} = req.body;

  // リクエストボディにemailが含まれているか確認
  if (!email) {
    res.status(400).send({error: "Email is required"});
    return; // ここで処理を終了
  }

  try {
    // 招待リストにあるか確認
    const isInvited = await checkIfInvited(email);

    if (isInvited) {
      res.status(200).send({message: "User is invited and authenticated"});
    } else {
      res.status(403).send({error: "User is not invited"});
    }
  } catch (error) {
    console.error("Error during login verification:", error);
    res.status(500).send({error: "Internal server error"});
  }
});
