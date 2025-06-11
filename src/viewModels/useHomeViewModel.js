import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {fetchUserData, logoutUser} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';

export function useHomeViewModel(navigation) {
  const [user, setUser] = useState({name: '', email: ''});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchUserData();

        setUser({name: data.name || 'Guest', email: data.email || ''});
      } catch (e) {
        Alert.alert(Strings.errors.error, e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = async () => {
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
              if (user.email) {
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

  return {user, loading, logout};
}
