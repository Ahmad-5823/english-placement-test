/* 1) Paste your Firebase web app settings here (Firebase console → Project settings → Your apps → Config).
   2) Teacher accounts: only these Google emails can open teacher.html and see results.
      Use the SAME emails in firestore.rules. */
window.FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};
window.TEACHER_EMAILS = ["zumourdaalmazloum@gmail.com"];
