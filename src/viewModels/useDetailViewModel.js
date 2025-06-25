// src/viewModels/useDetailViewModel.js
import {useEffect, useState, useCallback} from 'react';
import {Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchSimilar} from '../redux/moviesSlice';
import {addFavorite, removeFavorite} from '../redux/favoritesSlice';
import {fetchUserData, logoutUser} from '../services/firebaseAuth';
import Strings from '../utils/constants/Strings';
import Routes from '../utils/constants/Routes';

export function useDetailViewModel(movie, navigation) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const similarRaw = useSelector(state => state.movies.similarById[movie.id]);

  const similarMovies = similarRaw || [];

  const favorites = useSelector(state => state.favorites.items);
  const isFavorite = favorites.some(m => m.id === movie.id);

  useEffect(() => {
    dispatch(fetchSimilar(movie.id));
  }, [dispatch, movie.id]);

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

  const toggleFavorite = useCallback(() => {
    if (isFavorite) dispatch(removeFavorite(movie.id));
    else dispatch(addFavorite(movie));
  }, [dispatch, isFavorite, movie.id, movie]);

  return {
    user,
    loading: userLoading,
    logout,
    similarMovies,
    isFavorite,
    toggleFavorite,
  };
}
