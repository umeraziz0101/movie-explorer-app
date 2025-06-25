// services/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {auth, firestore} from './firebaseConfig';
import {doc, setDoc, getDoc, updateDoc} from 'firebase/firestore';

const FAVORITES_KEY = 'FAVORITES_LIST';

export default {
  async getFavorites() {
    try {
      const json = await AsyncStorage.getItem(FAVORITES_KEY);
      return json ? JSON.parse(json) : [];
    } catch {
      return [];
    }
  },

  async saveFavorites(list) {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(list));

    const state = await NetInfo.fetch();
    if (state.isConnected && auth.currentUser) {
      const ref = doc(firestore, 'favorites', auth.currentUser.uid);
      await setDoc(ref, {items: list}, {merge: true});
    }
  },

  async addFavorite(movie) {
    const list = await this.getFavorites();
    const updated = [...list, movie];
    await this.saveFavorites(updated);
    return updated;
  },

  async removeFavorite(movieId) {
    const list = await this.getFavorites();
    const updated = list.filter(m => m.id !== movieId);
    await this.saveFavorites(updated);
    return updated;
  },
};
