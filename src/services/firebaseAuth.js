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
import Keys from '../utils/constants/Keys';

export const registerUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const {uid} = userCredential.user;
    const userData = {name, email, createdAt: serverTimestamp()};

    const userRef = doc(firestore, Collections.users, uid);
    await setDoc(userRef, userData);

    const snapshot = await getDoc(userRef);

    if (snapshot.exists()) {
      console.info(
        Strings.consoleMessage.registerUserFetchedUserData,
        snapshot.data(),
      );
    } else {
      console.warn(Strings.consoleMessage.registerUserDocumentDoesNotExist);
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
  const currentUser = auth.currentUser;
  const userRef = doc(firestore, Collections.users, currentUser.uid);
  const snapshot = await getDoc(userRef);
  return snapshot.data();
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
      throw new Error(Strings.errors.emailNotRegistered);
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

    const resetRef = doc(firestore, Collections.passwordResets, email);
    await setDoc(resetRef, resetObj);

    return {success: true, code: randomCode};
  } catch (error) {
    console.log(Strings.consoleMessage.requestPasswordReset, error);
    return {
      success: false,
      message: error.message || getFirebaseErrorMessage(error),
    };
  }
};

export const verifyPasswordResetOTP = async (email, otpCode) => {
  try {
    const resetRef = doc(firestore, Collections.passwordResets, email);
    const snap = await getDoc(resetRef);

    if (!snap.exists()) {
      throw new Error(Strings.errors.otpNoRequestFound);
    }

    const data = snap.data();
    if (data.used === true) {
      throw new Error(Strings.errors.otpAlreadyUsed);
    }

    if (data.code !== otpCode) {
      throw new Error(Strings.errors.otpIncorrect);
    }

    const createdAt = data.createdAt?.toDate?.();
    if (!createdAt) {
      throw new Error(Strings.errors.otpInvalid);
    }
    const now = new Date();
    const diffMin = (now.getTime() - createdAt.getTime()) / 1000 / 60;
    if (diffMin > 15) {
      throw new Error(Strings.errors.otpExpired);
    }

    await updateDoc(resetRef, {used: true});

    return {success: true};
  } catch (error) {
    console.log(Strings.consoleMessage.verifyPasswordReset, error);
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
        result.data?.message || Strings.errors.resetPasswordError,
      );
    }
  } catch (error) {
    console.log(Strings.consoleMessage.confirmPasswordReset, error);
    return {success: false, message: error.message};
  }
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    console.log(Strings.consoleMessage.googleSignInResponse, response);
    const idToken = response.idToken || response.data?.idToken;
    console.log(
      Strings.consoleMessage.googleToken,
      idToken
        ? Strings.consoleMessage.googleFound
        : Strings.consoleMessage.googleMissing,
    );

    if (!idToken) {
      throw new Error(Strings.errors.googleNoIdTokenReceived);
    }
    const googleCredential = GoogleAuthProvider.credential(idToken);

    const userCredential = await signInWithCredential(auth, googleCredential);

    return {success: true, user: userCredential.user};
  } catch (error) {
    console.log(Strings.consoleMessage.googleSignInError, error);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return {
        success: false,
        message: Strings.consoleMessage.googleSignInCancelled,
      };
    } else if (error.code === statusCodes.IN_PROGRESS) {
      return {
        success: false,
        message: Strings.consoleMessage.googleSignInInprogress,
      };
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return {
        success: false,
        message: Strings.consoleMessage.googlePlayServiceNotAvailable,
      };
    }

    return {success: false, message: getFirebaseErrorMessage(error)};
  }
};

export const signInWithFacebook = async () => {
  try {
    const result = await LoginManager.logInWithPermissions([
      Keys.facebook.publicProfile,
      Keys.facebook.email,
    ]);

    if (result.isCancelled) {
      return {
        success: false,
        message: Strings.consoleMessage.facebookSignInCancelled,
      };
    }

    console.log(Strings.consoleMessage.facebookSignInResult, result);

    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw new Error(Strings.errors.facebookSomethingWentWrongToken);
    }

    const facebookCredential = FacebookAuthProvider.credential(
      data.accessToken,
    );

    const userCredential = await signInWithCredential(auth, facebookCredential);

    return {success: true, user: userCredential.user};
  } catch (error) {
    console.log(Strings.consoleMessage.facebookSignInError, error);

    if (error.message?.includes('cancelled')) {
      return {
        success: false,
        message: Strings.consoleMessage.facebookSignInCancelled,
      };
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
    if (!identityToken) throw new Error(Strings.errors.appleSignInFailed);
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
