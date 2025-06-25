// useHomeViewModel.js
import {useState, useEffect, useCallback} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPopular} from '../redux/moviesSlice';
import {fetchUserData, logoutUser} from '../services/firebaseAuth';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';
import Constants from '../utils/constants/Constants';

export function useHomeViewModel(navigation) {
  const dispatch = useDispatch();

  const {
    popular: moviesPopular,
    page,
    loading: moviesLoading,
  } = useSelector(state => state.movies);

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchPopular(1));
  }, [dispatch]);

  const loadMorePopularMovies = useCallback(() => {
    dispatch(fetchPopular(page));
  }, [dispatch, page]);

  const reloadPopularMovies = useCallback(() => {
    dispatch(fetchPopular(1));
  }, [dispatch]);

  useEffect(() => {
    let canceled = false;
    const initUser = async () => {
      setUserLoading(true);
      try {
        const data = await fetchUserData();
        if (!canceled) {
          setUser(
            data
              ? {name: data.name, email: data.email}
              : {name: Strings.texts.guest, email: Strings.texts.empty},
          );
        }
      } catch {
        if (!canceled) {
          setUser({name: Strings.texts.guest, email: Strings.texts.empty});
        }
      } finally {
        if (!canceled) setUserLoading(false);
      }
    };

    const timeout = setTimeout(initUser, Constants.fetchTimeOut);
    return () => {
      clearTimeout(timeout);
      canceled = true;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBack = () => {
        BackHandler.exitApp();
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBack);
      return () => sub.remove();
    }, []),
  );

  const logout = useCallback(() => {
    Alert.alert(
      Strings.alerts.title.logout,
      Strings.alerts.message.areYouWantToLogOut,
      [
        {text: Strings.buttons.no, style: 'cancel'},
        {
          text: Strings.buttons.yes,
          onPress: async () => {
            setUserLoading(true);
            try {
              if (user?.email) {
                const res = await logoutUser();
                if (!res.success) throw new Error(res.message);
              }
              setUser({name: Strings.texts.empty, email: Strings.texts.empty});
              navigation.replace(Routes.stack.onBoard);
            } catch (err) {
              Alert.alert(Strings.errors.error, err.message);
            } finally {
              setUserLoading(false);
            }
          },
        },
      ],
      {cancelable: true},
    );
  }, [navigation, user]);

  return {
    user,
    loading: userLoading,
    logout,
    moviesPopular,
    refreshing: moviesLoading,
    loadMorePopularMovies,
    reloadPopularMovies,
  };
}
