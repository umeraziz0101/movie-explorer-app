import {useState, useEffect, useCallback} from 'react';
import {Alert, BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {fetchUserData, logoutUser} from '../services/firebaseAuth';
import {moviesPopular as initialMoviesPopular} from '../data/DataManager';
import Routes from '../utils/constants/Routes';
import Strings from '../utils/constants/Strings';
import Constants from '../utils/constants/Constants';

export function useHomeViewModel(navigation) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [moviesPopular, setMoviesPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const loadPopularMovies = async (pageNumber = 1, isRefresh = false) => {
    if (isFetchingMore && !isRefresh) return;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setIsFetchingMore(true);
    }

    try {
      const pageSize = 10;
      const start = (pageNumber - 1) * pageSize;
      const end = start + pageSize;
      const nextPageData = initialMoviesPopular.slice(start, end);

      setMoviesPopular(prev =>
        isRefresh ? nextPageData : [...prev, ...nextPageData],
      );

      if (!isRefresh) setPage(pageNumber + 1);
    } catch (e) {
      console.error(e);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
        setPage(2);
      } else {
        setIsFetchingMore(false);
      }
    }
  };

  useEffect(() => {
    loadPopularMovies(1, true);
  }, []);

  const loadMorePopularMovies = () => {
    loadPopularMovies(page);
  };

  const reloadPopularMovies = () => {
    loadPopularMovies(1, true);
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const data = await fetchUserData();
        setUser(
          data
            ? {name: data.name, email: data.email}
            : {name: Strings.texts.guest, email: Strings.texts.empty},
        );
      } catch {
        setUser({name: Strings.texts.guest, email: Strings.texts.empty});
      }

      setLoading(false);
    };

    const timeout = setTimeout(init, Constants.fetchTimeOut);
    return () => clearTimeout(timeout);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        BackHandler.exitApp();
        return true;
      });
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
            setLoading(true);
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
              setLoading(false);
            }
          },
        },
      ],
      {cancelable: true},
    );
  }, [navigation, user]);

  return {
    user,
    loading,
    logout,
    moviesPopular,
    refreshing,
    reloadPopularMovies,
    loadMorePopularMovies,
  };
}
