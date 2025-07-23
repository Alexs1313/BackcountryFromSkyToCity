import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState } from 'react';

export const StoreContext = createContext();

export const useStore = () => {
  return useContext(StoreContext);
};

export const ContextProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);

  const savePlace = async place => {
    try {
      const jsonValue = await AsyncStorage.getItem('places');
      let parced = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const places = [...parced, place];

      await AsyncStorage.setItem('places', JSON.stringify(places));
    } catch (e) {
      console.error('Failed', e);
    }
  };

  const getSavedPlace = async () => {
    try {
      const savedData = await AsyncStorage.getItem('places');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setSavedPlaces(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removePlace = async selectedPlace => {
    const jsonValue = await AsyncStorage.getItem('places');
    let data = jsonValue != null ? JSON.parse(jsonValue) : [];

    const filtered = data.filter(item => item.id !== selectedPlace.id);

    setSavedPlaces(filtered);
    await AsyncStorage.setItem('places', JSON.stringify(filtered));
  };

  const value = {
    removePlace,
    getSavedPlace,
    savePlace,
    setSavedPlaces,
    savedPlaces,
    getSavedPlace,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
