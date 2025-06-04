// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
import {getFirebaseErrorMessage} from '../utils/firebase/firebaseErrors';
import {Collections} from '../utils/constants/Firestore';
import Strings from '../utils/constants/Strings';
import {auth, firestore} from './firebaseConfig';
//
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from '@react-native-firebase/firestore';
//

export const registerUser = async (name, email, password) => {
  try {
    console.info('registerUser : ', name, email, password);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const {uid} = userCredential.user;
    const userData = {name, email, createdAt: serverTimestamp()};
    console.info('[registerUser] about to write to Firestore →', userData);

    const userRef = doc(firestore, Collections.users, uid);
    await setDoc(userRef, userData);
    console.info('[registerUser] ✔︎ Successfully wrote user document');
    //
    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      console.info('[registerUser] 🔍 Fetched document data:', snapshot.data());
    } else {
      console.warn(
        '[registerUser] ⚠️ Document does not exist right after setDoc',
      );
    }
    //
    return {success: true, userData};
  } catch (error) {
    return {success: false, message: getFirebaseErrorMessage(error)};
  }
};

export const loginUser = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return {success: true};
  } catch (error) {
    return {success: false, message: getFirebaseErrorMessage(error)};
  }
};

export const logoutUser = async () => {
  try {
    await signOut();
    return {success: true};
  } catch (error) {
    return {success: false, message: getFirebaseErrorMessage(error)};
  }
};

export const fetchUserData = async () => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error(Strings.errors.noAuthUserFound);

    const doc = await firestore
      .collection(Collections.users)
      .doc(currentUser.uid)
      .get();
    if (!doc.exists) throw new Error(Strings.errors.userDataNotFound);

    return doc.data();
  } catch (error) {
    throw error;
  }
};

export const updateUserData = async updatedData => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error(Strings.errors.noAuthUserFound);

  const userRef = firestore.collection(Collections.users).doc(currentUser.uid);
  await userRef.update(updatedData);
};
