import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {fetchUserData, logoutUser} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';
import Constants from '../utils/constants/Constants';

export function useHomeViewModel(navigation) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      (async () => {
        setLoading(true);
        try {
          const data = await fetchUserData();
          console.log(Strings.consoleMessage.useHomeData, data);
          if (data) {
            setUser({name: data.name, email: data.email});
          } else {
            setUser({name: Strings.texts.guest, email: Strings.texts.empty});
          }
        } catch (e) {
          setUser({name: Strings.texts.guest, email: Strings.texts.empty});
        } finally {
          setLoading(false);
        }
      })();
    }, Constants.fetchTimeOut);
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
              setUser({name: Strings.texts.empty, email: Strings.texts.empty});
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
