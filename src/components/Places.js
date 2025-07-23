import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef } from 'react';

import SmallGradientButton from '../components/SmallGradientButton';
import { places } from '../data/places';
import { useStore } from '../store/context';

const { height } = Dimensions.get('window');

const Places = ({ screen }) => {
  const navigation = useNavigation();
  const { savedPlaces, getSavedPlace, removePlace } = useStore();
  const scale = useRef(new Animated.Value(1)).current;

  let placesList = [];
  screen === 'Saved' ? (placesList = savedPlaces) : (placesList = places);

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();

    return () => pulse.stop();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getSavedPlace();
    }, []),
  );

  const handleToggleSaved = selectedPlace => {
    removePlace(selectedPlace);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../assets/images/headerLogo.png')}
            style={{ position: 'absolute', top: 0 }}
          />
          <SmallGradientButton
            title={'BACK'}
            style={{ position: 'absolute', left: 16, top: 40 }}
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.sectionTitle}>
            {screen === 'Saved' ? 'SAVED PLACE' : 'WE RECOMMEND VISITING'}
          </Text>
        </View>
        {placesList.length === 0 && (
          <Text style={styles.emptyScreenText}>UNFORTUNATELY, IT'S EMPTY.</Text>
        )}
        <View style={styles.placesListWrap}>
          {placesList.map(place => (
            <View key={place.id}>
              <Image source={place.image} style={styles.image} />

              {screen === 'Saved' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.saveBtn}
                  onPress={() => handleToggleSaved(place)}
                >
                  <Animated.View
                    style={[styles.pulse, { transform: [{ scale }] }]}
                  />
                  <LinearGradient
                    colors={['#B48D32', '#D8AD4A']}
                    style={styles.gradientSavedButton}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('../assets/icons/save.png')}
                        style={styles.savedImage}
                      />
                      <Image
                        source={require('../assets/icons/done.png')}
                        style={styles.savedImage}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              )}

              <LinearGradient
                colors={['rgba(12,11,12,0)', '#0C0B0C']}
                style={styles.gradientOverlay}
              >
                <View style={styles.recsWrapper}>
                  <Text style={styles.place}>{place.name.toUpperCase()}</Text>
                  <Text style={styles.coordinates}>
                    {place.latitude} , {place.longitude}
                  </Text>

                  <View style={styles.cardDirectionWrap}>
                    <Text numberOfLines={2} style={styles.description}>
                      {place.description.toUpperCase()}
                    </Text>
                    <SmallGradientButton
                      title={'OPEN ALL'}
                      onPress={() => navigation.navigate('PlaceDetails', place)}
                    />
                  </View>
                </View>
              </LinearGradient>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0B0C',
    paddingTop: height * 0.07,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    top: 130,
  },
  place: {
    fontFamily: 'Poppins-Black',
    fontSize: 14,
    color: '#fff',
  },
  placesListWrap: { gap: 16, paddingTop: height * 0.19 },
  coordinates: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#fff',
    marginTop: 2,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#fff',
    marginTop: 10,
    width: '50%',
  },
  saveBtn: {
    width: 83,
    position: 'absolute',
    right: 10,
    top: 10,
  },
  emptyScreenText: {
    fontFamily: 'Poppins-Light',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginTop: height * 0.4,
  },
  gradientSavedButton: {
    width: 54,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    marginLeft: 16,
    marginTop: 9,

    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 14,
    backgroundColor: '#D8AD4A',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    height: '62%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    width: '100%',
    height: 259,
    borderRadius: 44,
  },
  recsWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 29,
  },
  savedImage: {
    width: 15.7,
    height: 15.7,
    gap: 3,
  },
  cardDirectionWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pulse: {
    position: 'absolute',
    left: 11,
    top: 4,
    width: 62,
    height: 42,
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    opacity: 0.4,
    zIndex: -1,
  },
});

export default Places;
