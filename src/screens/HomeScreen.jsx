import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import {auth, firestore} from '../services/firebaseConfig';
import {
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import Strings from '../utils/constants/Strings';
import {logoutUser} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import {Loader} from '../components/Loader';

const HomeScreen = () => {
  const guestUser = null;
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  // const [logout, setLogout] = useState(false);
  // useEffect(() => {
  //   setLoading(true);
  //   const fetchUser = async () => {
  //     try {
  //       const user = auth.currentUser;
  //       if (!user) {
  //         guestUser = 'Guest';
  //         setUser({name: guestUser});
  //         console.info('Signed in as Guest user.');
  //         return;
  //       }
  //       const uid = user.uid;
  //       const userRef = doc(firestore, 'users', uid);
  //       const snapshot = await getDoc(userRef);
  //       if (snapshot.exists()) {
  //         const data = snapshot.data();
  //         setUser({name: data.name, email: data.email});
  //       }
  //       // else {
  //       //   setName('');
  //       //   setEmail('');
  //       // }
  //     } catch (e) {
  //       console.error('Error saving or fetching user in Firestore:', e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  useEffect(() => {
    setLoading(true);

    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          // No authenticated user → treat as Guest
          console.info('Signed in as Guest user.');
          setUser({name: 'Guest', email: ''});
          return;
        }

        const uid = currentUser.uid;
        const userRef = doc(firestore, 'users', uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();
          setUser({name: data.name || '', email: data.email || ''});
        } else {
          // Document does not exist, but user is signed in.
          // You could choose to write a new doc here, or default to “Unknown.”
          setUser({name: '', email: currentUser.email || ''});
        }
      } catch (e) {
        console.error('Error fetching user from Firestore:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  ////////////////////
  const handleLogout = () => {
    Alert.alert(
      Strings.alerts.title.logout,
      Strings.alerts.message.areYouWantToLogOut,
      [
        {
          text: Strings.buttons.no,
          style: 'cancel',
        },
        {
          text: Strings.buttons.yes,
          onPress: async () => {
            // try {
            //   setLoading(true);
            //   setTimeout(async () => {
            //     if (guestUser) {
            //       guestUser = null;
            //     } else {
            //       await logoutUser();
            //     }
            //     navigation.replace(Routes.stack.onBoard);
            //   }, 2000);
            // } catch (error) {
            //   Alert.alert(Strings.errors.error, error.message);
            // }
            try {
              setLoading(true);
              setTimeout(async () => {
                await logoutUser();
                setLoading(false);
                navigation.replace(Routes.stack.onBoard);
              }, 2000);
            } catch (error) {
              Alert.alert(Strings.errors.error, error.message);
              setLoading(false);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <Wrapper>
      <View style={styles.row}>
        <CustomText>Name: </CustomText>
        <CustomText>{user.name}</CustomText>
      </View>
      <View style={styles.row}>
        <CustomText>email: </CustomText>
        <CustomText>{user.email}</CustomText>
      </View>
      <CustomButton
        buttonText={'Log out'}
        buttonContainerStyle={styles.button}
        onPress={handleLogout}
      />
      <Loader visible={loading} />
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  button: {
    marginTop: 18,
  },
});
