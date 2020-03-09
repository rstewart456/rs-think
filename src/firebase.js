import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'


const config = {
  apiKey: "AIzaSyB5mZksIwKC93gPi1p3uc5A0HNERkBcQ1c",
  authDomain: "think-piece-cb5eb.firebaseapp.com",
  databaseURL: "https://think-piece-cb5eb.firebaseio.com",
  projectId: "think-piece-cb5eb",
  storageBucket: "think-piece-cb5eb.appspot.com",
  messagingSenderId: "603056826506",
  appId: "1:603056826506:web:5cc4eeb9a34d438e"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

window.firebase = firebase;

export const createUserProfileDocument = async (user, additionalData) => {
  if(!user) return;

  //Get a reference to the place in the database where a user profile might be. //
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the docuemnet from that location. //
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    return firestore.collection('users').doc(uid)
    } catch (error) {
    console.error('Error fetching user', error.message);
  }
}

export default firebase;