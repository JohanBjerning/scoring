import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { child, push, update, ref, get, getDatabase } from "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  appId: process.env.REACT_APP_APP_ID,
}

const app = initializeApp(config);
const db = getDatabase(app);
const auth = getAuth(app);
const user = auth ? auth.currentUser : null;

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const doc = await get(child(ref(db), `users/${user.uid}`))
    if (!doc.exists()) {
      const updates = {};
      updates['/users/' + user.uid] = {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
      };
      await update(ref(db), updates);
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const updates = {};
    updates['/users/' + user.uid] = {
      uid: user.uid,
      name,
      authProvider: "local",
      email: email,
    };
    update(ref(db), updates);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const updateDb = (path, id, data, doIncrement = false) => {
  var tId = id;
  try {
    const updates = {};    
    if(!tId)
      tId = push(child(ref(db), path)).key;

    updates[path + tId] = data;    
    update(ref(db), updates);
  } catch (err) { 
    console.error(err);
  }
  return tId;
}

const logout = () => {
  signOut(auth);
};

export {
  app,
  db,
  auth,
  user,
  ref,
  updateDb,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};