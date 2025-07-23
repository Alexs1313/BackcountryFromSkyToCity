import { useNavigation } from '@react-navigation/native';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import SmallGradientButton from '../components/SmallGradientButton';

const { height } = Dimensions.get('window');

const Home = () => {
  const navigation = useNavigation();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.quizContainer}>
          <Image
            source={require('../assets/images/miniLogo.png')}
            style={styles.logoImg}
          />
          <LinearGradient
            colors={['rgba(12,11,12,0)', '#0C0B0C']}
            style={styles.gradientOverlay}
          >
            <Text style={styles.cardTitle}>NEW ZEALAND QUIZ</Text>
            <Text style={styles.cardsubtitle}>
              Test your knowledge about New Zealand!
            </Text>
            <View style={{ width: '30%' }}>
              <SmallGradientButton
                title={'START'}
                style={{ marginLeft: 24, marginTop: 14 }}
                onPress={() => navigation.navigate('Quiz')}
              />
            </View>
          </LinearGradient>

          <Image
            source={require('../assets/images/quizContainer.png')}
            style={styles.qiuzContainerImg}
          />
        </View>

        <View style={styles.recsContainer}>
          <Image
            source={require('../assets/images/recomends.png')}
            style={{ width: '100%' }}
          />
          <LinearGradient
            colors={['rgba(12,11,12,0)', '#0C0B0C']}
            style={styles.gradientOverlay}
          >
            <View style={styles.recsWrapper}>
              <Text style={styles.mapTitle}>WE RECOMMEND VISITING</Text>

              <SmallGradientButton
                title={'START'}
                onPress={() => navigation.navigate('PlacesRecommends')}
              />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.mapContainer}>
          <Image
            source={require('../assets/images/mapBg.png')}
            style={{ width: '100%' }}
          />
          <LinearGradient
            colors={['rgba(12,11,12,0)', '#0C0B0C']}
            style={styles.gradientOverlay}
          >
            <View style={styles.mapWrapper}>
              <Text style={styles.mapTitle}>INTERACTIVE MAP</Text>

              <SmallGradientButton
                title={'START'}
                onPress={() => navigation.navigate('Map')}
              />
            </View>
          </LinearGradient>
        </View>

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.savedPlacesContainer}
            onPress={() => navigation.navigate('SavedPlaces')}
          >
            <Image source={require('../assets/icons/saved.png')} />
            <LinearGradient
              colors={['rgba(12,11,12,0)', '#0C0B0C']}
              style={styles.gradientOverlay}
            >
              <View style={styles.textWrapper}>
                <Text style={styles.mapTitle}>SAVED PLACE</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.savedPlacesContainer, { width: '44%' }]}
            onPress={() => navigation.navigate('Info')}
          >
            <Image source={require('../assets/icons/info.png')} />
            <LinearGradient
              colors={['rgba(12,11,12,0)', '#0C0B0C']}
              style={styles.gradientOverlay}
            >
              <View style={styles.textWrapper}>
                <Text style={styles.mapTitle}>INFORMATION</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0B0C',
    paddingTop: height * 0.078,
    padding: 16,
    paddingBottom: 30,
  },
  logoImg: { position: 'absolute', top: 5, left: -15 },
  qiuzContainerImg: {
    position: 'absolute',
    bottom: 0,
    right: -20,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    height: '62%',
    width: '100%',
  },
  cardTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
    marginLeft: 24,
    marginBottom: 5,
  },
  mapTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
  },
  cardsubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: '#fff',
    marginLeft: 24,
  },
  quizContainer: {
    width: '100%',
    borderRadius: 44,
    backgroundColor: '#363636',
    height: 185,
  },
  recsContainer: {
    width: '100%',
    borderRadius: 44,
    marginTop: 24,
    backgroundColor: '#363636',
    height: 197,
    overflow: 'hidden',
  },
  mapContainer: {
    width: '100%',
    borderRadius: 44,
    marginTop: 24,
    backgroundColor: '#363636',
    height: 154,
    overflow: 'hidden',
  },
  savedPlacesContainer: {
    width: '52%',
    borderRadius: 44,
    marginTop: 24,
    backgroundColor: '#363636',
    height: 121,
    alignItems: 'center',
    paddingTop: 20,
  },
  textWrapper: {
    alignItems: 'center',
    marginHorizontal: 17,
    marginTop: 14,
  },
  recsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
    alignItems: 'center',
    marginHorizontal: 17,
  },
  mapWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    alignItems: 'center',
    marginHorizontal: 17,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Home;
