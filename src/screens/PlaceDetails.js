import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useStore } from '../store/context';
import SmallGradientButton from '../components/SmallGradientButton';
import MediumGradientButton from '../components/MediumGradientButton';
import Orientation from 'react-native-orientation-locker';

const { height } = Dimensions.get('window');

const PlaceDetails = ({ route }) => {
  const navigation = useNavigation();
  const place = route.params;
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [toggleIcon, setToggleIcon] = useState(false);
  const { savePlace, removePlace, getSavedPlace, savedPlaces } = useStore();
  const scale = useRef(new Animated.Value(1)).current;

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
      renderSavedPlaces(place);
      getSavedPlace();
    }, []),
  );

  const handleToggleSaved = () => {
    if (toggleIcon) {
      removePlace(place);
      setToggleIcon(false);
    } else {
      savePlace(place);
      setToggleIcon(true);
    }
  };

  const renderSavedPlaces = async item => {
    const jsonValue = await AsyncStorage.getItem('places');
    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null ? setToggleIcon(false) : setToggleIcon(true);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${place.name}
${place.latitude} , ${place.longitude}
${place.description}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoBack = () => {
    if (isOpenMap) setIsOpenMap(false), Orientation.unlockAllOrientations();
    else navigation.goBack();
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
            style={{ position: 'absolute', left: 0, top: 40 }}
            onPress={handleGoBack}
          />
          {!isOpenMap && (
            <Text style={styles.sectionTitle}>WE RECOMMEND VISITING</Text>
          )}
        </View>
        {isOpenMap ? (
          <View style={styles.mapWrap}>
            <Text style={styles.place}>{place.name.toUpperCase()}</Text>
            <Text style={styles.coordinates}>
              {place.latitude} , {place.longitude}
            </Text>
            <View style={styles.shadowWrap}>
              <View style={styles.mapContainer}>
                <MapView
                  userInterfaceStyle="dark"
                  style={styles.map}
                  initialRegion={{
                    latitude: place.latitude,
                    longitude: place.longitude,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: place.latitude,
                      longitude: place.longitude,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02,
                    }}
                  >
                    {Platform.OS === 'ios' ? (
                      <Image source={require('../assets/icons/marker.png')} />
                    ) : null}
                  </Marker>
                </MapView>
              </View>
            </View>
          </View>
        ) : (
          <View style={{ gap: 16, paddingTop: height * 0.19 }}>
            <View key={place.id} style={styles.placeContainer}>
              <View>
                <Image source={place.image} style={styles.image} />
                <View style={styles.ratingWrap}>
                  <Image source={require('../assets/icons/star.png')} />
                  <Text style={styles.rating}>{place.rating}</Text>
                </View>

                <LinearGradient
                  colors={['rgba(12,11,12,0)', '#0C0B0C']}
                  style={styles.gradientOverlay}
                >
                  <View style={styles.recsWrapper}>
                    <View style={styles.cardDirection}>
                      <View>
                        <Text style={styles.place}>
                          {place.name.toUpperCase()}
                        </Text>
                        <Text style={styles.coordinates}>
                          {place.latitude} , {place.longitude}
                        </Text>
                      </View>
                      <SmallGradientButton
                        title={'OPEN ON MAP'}
                        onPress={() => {
                          setIsOpenMap(true), Orientation.lockToPortrait();
                        }}
                        style={{ position: 'absolute', right: 0 }}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={styles.description}>{place.description}</Text>

                <View style={styles.cardButtonsWrap}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ width: 83 }}
                    onPress={handleToggleSaved}
                  >
                    <Animated.View
                      style={[styles.pulse, { transform: [{ scale }] }]}
                    />
                    <LinearGradient
                      colors={['#B48D32', '#D8AD4A']}
                      style={styles.gradientButton}
                    >
                      {toggleIcon ? (
                        <View style={{ flexDirection: 'row' }}>
                          <Image source={require('../assets/icons/save.png')} />
                          <Image source={require('../assets/icons/done.png')} />
                        </View>
                      ) : (
                        <Image source={require('../assets/icons/save.png')} />
                      )}
                    </LinearGradient>
                  </TouchableOpacity>

                  <MediumGradientButton
                    onPress={handleShare}
                    style={{ marginTop: 12 }}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
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
    width: '70%',
  },
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
    marginTop: 21,
  },
  rating: {
    fontFamily: 'Poppins-Black',
    fontSize: 13,
    color: '#fff',
  },
  ratingWrap: {
    position: 'absolute',
    right: 33,
    top: 27,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  gradientButton: {
    width: 86,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: 12,

    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 6, height: 13 },
    shadowOpacity: 0.75,
    shadowRadius: 13,
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
    paddingBottom: 16,
  },
  placeContainer: {
    paddingBottom: 20,
    borderRadius: 44,
    backgroundColor: '#0C0B0C',

    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.55,
    shadowRadius: 35,
    elevation: 14,
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    width: '100%',
    height: '80%',
    borderRadius: 22,
    marginTop: 8,
    overflow: 'hidden',
  },
  shadowWrap: {
    borderRadius: 20,
    height: '100%',
    shadowColor: 'rgba(255, 255, 255, 0.29)',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 20,

    elevation: 300,
    backgroundColor: 'transparent',
  },
  mapWrap: {
    marginTop: height * 0.15,
  },
  cardDirection: {},
  cardButtonsWrap: {
    flexDirection: 'row',
    gap: 22,
  },
  pulse: {
    position: 'absolute',
    left: -4,
    top: 8.5,
    width: 92,
    height: 60,
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    opacity: 0.4,
    zIndex: -1,
  },
});

export default PlaceDetails;
