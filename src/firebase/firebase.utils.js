import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA5PNy7_bB797JgoqUdhnG8OPJHoG-RGww",
    authDomain: "prisoner-skills-2.firebaseapp.com",
    databaseURL: "https://prisoner-skills-2.firebaseio.com",
    projectId: "prisoner-skills-2",
    storageBucket: "prisoner-skills-2.appspot.com",
    messagingSenderId: "25122848235",
    appId: "1:25122848235:web:b3aaf43d3523d60b522dae"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { username, password } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          username,
          password,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;