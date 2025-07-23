import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

import SmallGradientButton from '../components/SmallGradientButton';
import { places } from '../data/places';
import Orientation from 'react-native-orientation-locker';

const { height } = Dimensions.get('window');

const Map = () => {
  const navigation = useNavigation();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { width } = useWindowDimensions();

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.headerTitle}>INTERACTIVE MAP</Text>
          <SmallGradientButton
            title={'BACK'}
            style={{ position: 'absolute', left: 16 }}
            onPress={() => navigation.goBack()}
          />
        </View>

        <ImageBackground
          source={require('../assets/images/mapBack.png')}
          style={{ height: '100%', width: '100%' }}
        >
          <View style={styles.shadowWrap}>
            <View style={styles.mapContainer}>
              <MapView
                userInterfaceStyle="dark"
                style={styles.map}
                initialRegion={{
                  latitude: -43.9244,
                  longitude: 170.5305,
                  latitudeDelta: 3.34,
                  longitudeDelta: 3.34,
                }}
              >
                {places.map(marker => (
                  <Marker
                    key={marker.id}
                    coordinate={{
                      latitude: marker.latitude,
                      longitude: marker.longitude,
                    }}
                    onPress={() =>
                      selectedMarker !== null
                        ? setSelectedMarker(null)
                        : setSelectedMarker(marker)
                    }
                  >
                    {Platform.OS === 'ios' ? (
                      <Image source={require('../assets/icons/marker.png')} />
                    ) : null}
                  </Marker>
                ))}
              </MapView>
            </View>
            {selectedMarker && (
              <View style={{ position: 'absolute', top: 30 }}>
                <View>
                  <Image
                    source={selectedMarker.image}
                    style={[styles.image, { width: width - 90 }]}
                  />
                  <LinearGradient
                    colors={['rgba(12,11,12,0)', '#0C0B0C']}
                    style={styles.gradientOverlay}
                  >
                    <View style={styles.recsWrapper}>
                      <View style={styles.containerWrap}>
                        <View>
                          <Text style={styles.place}>
                            {selectedMarker.name.toUpperCase()}
                          </Text>
                          <Text style={styles.coordinates}>
                            {selectedMarker.latitude} ,
                            {selectedMarker.longitude}
                          </Text>
                        </View>
                        <SmallGradientButton
                          title={'READ MORE'}
                          onPress={() =>
                            navigation.navigate('PlaceDetails', selectedMarker)
                          }
                          style={{ position: 'absolute', right: 0 }}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0B0C',
    paddingTop: height * 0.105,
  },
  headerTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  map: {
    flex: 1,
  },
  mapContainer: {
    width: '90%',
    height: '75%',
    borderRadius: 22,
    marginTop: height * 0.1,
    overflow: 'hidden',
  },
  shadowWrap: {
    borderRadius: 20,
    height: '100%',
    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 300,

    backgroundColor: 'transparent',
    alignItems: 'center',
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
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    height: '62%',
    width: '100%',

    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
    justifyContent: 'flex-end',
  },
  image: {
    width: '100',
    height: 165,
    borderRadius: 44,
  },
  recsWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    width: 200,
    height: 165,
  },
});

export default Map;
