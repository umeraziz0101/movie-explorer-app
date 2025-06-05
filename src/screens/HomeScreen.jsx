import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import {auth, firestore} from '../services/firebaseConfig';
import {doc, getDoc} from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import Strings from '../utils/constants/Strings';
import {logoutUser} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import {Loader} from '../components/Loader';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const guestUser = null;
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchUser = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
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
          setUser({name: 'Guest', email: currentUser.email || ''});
        }
      } catch (e) {
        console.error('Error fetching user from Firestore:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
            setLoading(true);
            try {
              if (user.email !== '') {
                const result = await logoutUser();
                if (!result.success) {
                  throw new Error(result.message || 'Unknown logout error');
                }
              }

              setUser({name: '', email: ''});

              navigation.replace(Routes.stack.onBoard);
            } catch (error) {
              Alert.alert(Strings.errors.error, error.message);
            } finally {
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
