import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Wrapper from '../components/Wrapper';
import CustomText from '../components/CustomText';
import {auth, firestore} from '../utils/firebase/config';
import {doc, setDoc, serverTimestamp} from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const [email, setEmail] = useState(null);
  useEffect(() => {
    const saveCurrentUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.warn('No authenticated user found.');
          return;
        }
        const uid = user.uid;
        const userEmail = user.email;
        setEmail(userEmail);
        await setDoc(doc(firestore, 'users', uid), {
          email: userEmail,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Error saving user to Firestore:', e);
      }
    };

    saveCurrentUser();
  }, []);

  return (
    <Wrapper>
      <View style={styles.row}>
        <CustomText>Name: </CustomText>
        <CustomText>umer</CustomText>
      </View>
      <View style={styles.row}>
        <CustomText>email: </CustomText>
        <CustomText>{email ? email : 'Loading...'}</CustomText>
      </View>
    </Wrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
