import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {auth, firestore} from '../services/firebaseConfig';
import {doc, getDoc} from '@react-native-firebase/firestore';
import {logoutUser} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';

export function useHomeViewModel(navigation) {
  const [user, setUser] = useState({name: '', email: ''});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.info('Signed in as Guest user.');
          setUser({name: 'Guest', email: ''});
          return;
        }
        const snapshot = await getDoc(doc(firestore, 'users', currentUser.uid));
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUser({name: data.name, email: data.email});
        } else {
          setUser({
            name: currentUser.displayName || 'Guest',
            email: currentUser.email || '',
          });
        }
      } catch (e) {
        console.error('Error fetching user:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = () => {
    Alert.alert(
      Strings.alerts.title.logout,
      Strings.alerts.message.areYouWantToLogOut,
      [
        {text: Strings.buttons.no, style: 'cancel'},
        {
          text: Strings.buttons.yes,
          onPress: async () => {
            setLoading(true);
            try {
              if (user.email !== '') {
                const result = await logoutUser();
                if (!result.success) throw new Error(result.message);
              }
              setUser({name: '', email: ''});
              navigation.replace(Routes.stack.onBoard);
            } catch (err) {
              Alert.alert(Strings.errors.error, err.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return {
    user,
    loading,
    logout,
  };
}
