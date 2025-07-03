import {useEffect, useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchMovie} from '../redux/movieDetailsSlice';
import {addFavorite, removeFavorite} from '../redux/favoritesSlice';
import storage from '../services/storage';
import {fetchUserData, logoutUser} from '../services/firebaseAuth';
import Strings from '../utils/constants/Strings';
import Routes from '../utils/constants/Routes';

export function useDetailViewModel(movieId, navigation) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.some(m => m.id === movieId);

  const movie = useSelector(s => s.movie.byId[movieId]);
  const loadingMovie = useSelector(s => s.movie.loading[movieId]);
  const error = useSelector(s => s.movie.error[movieId]);

  useEffect(() => {
    if (!movie) dispatch(fetchMovie(movieId));
  }, [movieId, movie, dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserData();
        setUser(
          data
            ? {name: data.name, email: data.email}
            : {name: Strings.texts.guest, email: Strings.texts.empty},
        );
      } catch {
        setUser({name: Strings.texts.guest, email: Strings.texts.empty});
      } finally {
        setUserLoading(false);
      }
    })();
  }, []);

  const logout = useCallback(() => {
    Alert.alert(
      Strings.alerts.title.logout,
      Strings.alerts.message.areYouWantToLogOut,
      [
        {text: Strings.buttons.no, style: 'cancel'},
        {
          text: Strings.buttons.yes,
          onPress: async () => {
            try {
              await logoutUser();
              navigation.replace(Routes.stack.onBoard);
            } catch (e) {
              Alert.alert(Strings.errors.error, e.message);
            }
          },
        },
      ],
      {cancelable: true},
    );
  }, [navigation]);

  const toggleFavorite = useCallback(async () => {
    try {
      if (isFavorite) {
        dispatch(removeFavorite(movieId));

        await storage.removeFavorite(movieId);
      } else {
        dispatch(addFavorite(movie));

        await storage.addFavorite(movie);
      }
    } catch (err) {
      Alert.alert(
        Strings.errors.error,
        err.message || Strings.errors.failedToUpdateFavorites,
      );
    }
  }, [dispatch, isFavorite, movie]);

  return {
    user,
    loadingMovie,
    error,
    loading: userLoading,
    logout,

    movie,
    isFavorite,
    toggleFavorite,
  };
}
