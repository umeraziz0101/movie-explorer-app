import {getFirebaseErrorMessage} from '../utils/firebase/firebaseErrors';
import {Collections} from '../utils/constants/Firestore';
import Strings from '../utils/constants/Strings';
import {auth, firestore, functions} from './firebaseConfig';
import {httpsCallable} from '@react-native-firebase/functions';

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
  getDocs,
  collection,
  updateDoc,
  query,
  where,
} from '@react-native-firebase/firestore';

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

    const snapshot = await getDoc(userRef);
    if (snapshot.exists()) {
      console.info('[registerUser] 🔍 Fetched document data:', snapshot.data());
    } else {
      console.warn(
        '[registerUser] ⚠️ Document does not exist right after setDoc',
      );
    }

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
    await signOut(auth);
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

export const requestPasswordReset = async email => {
  try {
    const usersRef = collection(firestore, Collections.users);
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      throw new Error(
        Strings.errors.emailNotRegistered || 'Email not registered',
      );
    }

    const userDoc = snapshot.docs[0];
    const uid = userDoc.id;

    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();

    const resetObj = {
      uid,
      code: randomCode,
      createdAt: serverTimestamp(),
      used: false,
    };

    const resetRef = doc(firestore, 'password_resets', email);
    await setDoc(resetRef, resetObj);

    return {success: true, code: randomCode};
  } catch (error) {
    console.log('requestPasswordReset →', error);
    return {
      success: false,
      message: error.message || getFirebaseErrorMessage(error),
    };
  }
};

export const verifyPasswordResetOTP = async (email, otpCode) => {
  try {
    const resetRef = doc(firestore, 'password_resets', email);
    const snap = await getDoc(resetRef);

    if (!snap.exists()) {
      throw new Error('No OTP request found for this email.');
    }

    const data = snap.data();
    if (data.used === true) {
      throw new Error('This code has already been used.');
    }

    if (data.code !== otpCode) {
      throw new Error('You entered OTP code is incorrect.');
    }

    const createdAt = data.createdAt?.toDate?.();
    if (!createdAt) {
      throw new Error('Invalid OTP record.');
    }
    const now = new Date();
    const diffMin = (now.getTime() - createdAt.getTime()) / 1000 / 60;
    if (diffMin > 15) {
      throw new Error('This OTP code has expired. Please request again.');
    }

    await updateDoc(resetRef, {used: true});

    return {success: true};
  } catch (error) {
    console.log('verifyPasswordResetOTP →', error);
    return {success: false, message: error.message};
  }
};

export const confirmPasswordResetWithOTP = async (email, newPassword) => {
  try {
    const resetFn = httpsCallable(functions, 'adminResetPassword');

    const result = await resetFn({email, newPassword});

    if (result.data?.success) {
      return {success: true};
    } else {
      throw new Error(
        result.data?.message || 'Unknown error resetting password',
      );
    }
  } catch (error) {
    console.log('confirmPasswordResetWithOTP →', error);
    return {success: false, message: error.message};
  }
};
