import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SmallGradientButton from '../components/SmallGradientButton';
import MediumGradientButton from '../components/MediumGradientButton';

const { height } = Dimensions.get('window');

const Info = () => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Backcountry: From Sky to City — your interactive guide to New
Zealand with a detailed map, a selection of top locations,
informative facts, and a fascinating history quiz. All in one
convenient app!`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false}>
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          <Text style={styles.headerTitle}>INFORMATION</Text>
          <SmallGradientButton
            title={'BACK'}
            style={{ position: 'absolute' }}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <Image
            source={require('../assets/images/largeLogo.png')}
            style={{ top: 55, left: -21 }}
          />
          <Text style={styles.infoText}>
            Backcountry: From Sky to City — your interactive guide to New
            Zealand with a detailed map, a selection of top locations,
            informative facts, and a fascinating history quiz. All in one
            convenient app!
          </Text>
        </View>

        <View style={styles.buttonWrap}>
          <MediumGradientButton
            onPress={handleShare}
            style={{ marginTop: 12.5 }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0B0C',
    paddingTop: height * 0.105,
    padding: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  infoText: {
    fontFamily: 'Poppins-Black',
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 15,
  },
  buttonWrap: {
    marginLeft: 16,
    marginTop: 9,
  },
});

export default Info;
