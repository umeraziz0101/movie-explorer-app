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
import {getFirebaseErrorMessage} from '../utils/firebase/firebaseErrors';
import {Collections} from '../utils/constants/Firestore';
import Strings from '../utils/constants/Strings';
import {auth, firestore, functions} from './firebaseConfig';
import {httpsCallable} from '@react-native-firebase/functions';

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

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
  setTimeout(async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        throw new Error(Strings.errors.noAuthUserFound);
      }

      const userRef = doc(firestore, Collections.users, currentUser.uid);
      const snapshot = await getDoc(userRef);
      if (snapshot.exists()) {
        return snapshot.data();
      }

      return {
        name: currentUser.displayName || 'Guest',
        email: currentUser.email || '',
      };
    } catch (error) {
      console.error('fetchUserData →', error);
      throw error;
    }
  }, 3000);
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

export const signInWithGoogle = async () => {
  try {
    console.log('Starting Google Sign-In...');
    await GoogleSignin.hasPlayServices();

    const response = await GoogleSignin.signIn();
    console.log('Google Sign-In response:', response);
    const idToken = response.idToken || response.data?.idToken;
    console.log('ID Token:', idToken ? 'Found' : 'Missing');

    if (!idToken) {
      throw new Error('No ID token received from Google Sign-In');
    }
    const googleCredential = GoogleAuthProvider.credential(idToken);

    const userCredential = await signInWithCredential(auth, googleCredential);
    console.log('Firebase sign-in successful');

    return {success: true, user: userCredential.user};
  } catch (error) {
    console.error('Google Sign-In Error:', error);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return {success: false, message: 'Sign-in cancelled by user'};
    } else if (error.code === statusCodes.IN_PROGRESS) {
      return {success: false, message: 'Sign-in already in progress'};
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return {success: false, message: 'Google Play Services not available'};
    }

    return {success: false, message: getFirebaseErrorMessage(error)};
  }
};

export const signInWithFacebook = async () => {
  try {
    console.log('Starting Facebook Sign-In...');

    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      console.log('Facebook login cancelled by user');
      return {success: false, message: 'User cancelled the login process'};
    }

    console.log('Facebook login result:', result);

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error('Something went wrong obtaining Facebook access token');
    }

    console.log('Facebook access token obtained');

    const facebookCredential = FacebookAuthProvider.credential(
      data.accessToken,
    );

    const userCredential = await signInWithCredential(auth, facebookCredential);

    console.log('Firebase Facebook sign-in successful');

    return {success: true, user: userCredential.user};
  } catch (error) {
    console.error('Facebook Sign-In Error:', error);

    if (error.message?.includes('cancelled')) {
      return {success: false, message: 'User cancelled the login process'};
    }

    return {success: false, message: getFirebaseErrorMessage(error)};
  }
};

export const signInWithApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const {identityToken, nonce} = appleAuthRequestResponse;
    if (!identityToken) throw new Error('Apple Sign-In failed');
    const appleCredential = OAuthProvider.credential(
      'apple.com',
      identityToken,
      nonce,
    );
    const userCredential = await signInWithCredential(auth, appleCredential);
    return {success: true, user: userCredential.user};
  } catch (error) {
    return {success: false, message: getFirebaseErrorMessage(error)};
  }
};
