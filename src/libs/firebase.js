import admin from "firebase-admin";
import {
  FIREBASE_CLIENT_EMAIL,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
} from "../config/index.js";

console.log("FIREBASE_PROJECT_ID", FIREBASE_PROJECT_ID);
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: FIREBASE_PROJECT_ID,
    private_key: FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: FIREBASE_CLIENT_EMAIL,
  }),
});
export const firebaseMessaging = admin.messaging();
