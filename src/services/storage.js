import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {auth} from './firebaseConfig';
import {
  addFavoriteToFirebase,
  removeFavoriteFromFirebase,
  setFavoritesToFirebase,
  getFavoritesFromFirebase,
} from './firebaseAuth';
import Strings from '../utils/constants/Strings';

const FAVORITES_KEY = 'FAVORITES_LIST';

export default {
  async getFavorites() {
    try {
      const json = await AsyncStorage.getItem(FAVORITES_KEY);
      const localFavorites = json ? JSON.parse(json) : [];

      const state = await NetInfo.fetch();
      const uid = auth.currentUser?.uid;

      if (state.isConnected && uid) {
        try {
          const firebaseResult = await getFavoritesFromFirebase();
          if (firebaseResult.success) {
            const validItems = firebaseResult.items.filter(
              item => item && item.id,
            );
            await AsyncStorage.setItem(
              FAVORITES_KEY,
              JSON.stringify(validItems),
            );
            return validItems;
          }
        } catch (error) {
          console.warn(Strings.errors.failedToSyncFavorites, error);
        }
      }

      return localFavorites.filter(item => item && item.id);
    } catch {
      return [];
    }
  },

  async saveFavorites(list) {
    try {
      const validList = list.filter(item => item && item.id);

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(validList));

      const state = await NetInfo.fetch();
      const uid = auth.currentUser?.uid;

      if (state.isConnected && uid) {
        try {
          await setFavoritesToFirebase(validList);
        } catch (error) {
          console.warn(Strings.errors.firebaseSyncFailed, error);
        }
      }

      return validList;
    } catch (error) {
      console.error(Strings.errors.failedToSaveFavorites, error);
      throw error;
    }
  },

  async addFavorite(movie) {
    try {
      if (!movie || !movie.id) {
        throw new Error(Strings.errors.invalidMovieObject);
      }

      const list = await this.getFavorites();

      const movieExists = list.some(item => item.id === movie.id);
      if (movieExists) {
        return list;
      }

      const updated = [...list, movie];

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

      const state = await NetInfo.fetch();
      const uid = auth.currentUser?.uid;

      if (state.isConnected && uid) {
        try {
          await addFavoriteToFirebase(movie);
        } catch (error) {
          console.warn(Strings.errors.failedToAddFavoriteToFirebase, error);
        }
      }

      return updated;
    } catch (error) {
      console.error(Strings.errors.failedToSaveFavorites, error);
      throw error;
    }
  },

  async removeFavorite(movieId) {
    try {
      const list = await this.getFavorites();
      const updated = list.filter(m => m.id !== movieId);

      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

      const state = await NetInfo.fetch();
      const uid = auth.currentUser?.uid;

      if (state.isConnected && uid) {
        try {
          await removeFavoriteFromFirebase(movieId);
        } catch (error) {
          console.warn(
            Strings.errors.failedToRemoveFavoriteFromFirebase,
            error,
          );
        }
      }

      return updated;
    } catch (error) {
      console.error(Strings.errors.failedToRemoveFavorite, error);
      throw error;
    }
  },

  async cleanupFavorites() {
    try {
      const favorites = await this.getFavorites();
      const cleaned = favorites.filter(item => item && item.id);

      if (cleaned.length !== favorites.length) {
        await this.saveFavorites(cleaned);
        console.log(Strings.alerts.message.cleanedFavorites);
      }

      return cleaned;
    } catch (error) {
      console.error(Strings.errors.failedToCleanupFavorites, error);
      return [];
    }
  },
};
