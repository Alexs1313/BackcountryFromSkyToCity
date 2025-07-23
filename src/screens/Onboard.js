import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import LargeGradientButton from '../components/LargeGradientButton';

const { height } = Dimensions.get('window');

const Onboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigation = useNavigation();

  const handleNextStep = () => {
    currentStep === 3
      ? navigation.replace('Home')
      : setCurrentStep(currentStep + 1);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        {currentStep === 1 && (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Image source={require('../assets/images/onboardBg.png')} />
            <Image
              source={require('../assets/images/onboardLogo.png')}
              style={{ position: 'absolute', top: -50 }}
            />
            <Image
              source={require('../assets/images/onboardFirst.png')}
              style={{ position: 'absolute', top: 15 }}
            />
          </View>
        )}

        {currentStep === 2 && (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Image source={require('../assets/images/onboardBg.png')} />

            <View style={{ position: 'absolute', top: -50 }}>
              <Image source={require('../assets/images/onboardThird.png')} />
              <Image
                source={require('../assets/images/gradient.png')}
                style={{ position: 'absolute', bottom: 0, left: -30 }}
              />
            </View>
          </View>
        )}

        {currentStep === 3 && (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Image source={require('../assets/images/onboardBg.png')} />

            <View style={{ position: 'absolute', top: -25 }}>
              <Image source={require('../assets/images/onboardSecond.png')} />
              <Image
                source={require('../assets/images/gradient.png')}
                style={{ position: 'absolute', bottom: 0, left: -30 }}
              />
            </View>
          </View>
        )}

        <View style={{ paddingHorizontal: 18 }}>
          <View style={styles.pagination}>
            {[1, 2, 3].map(item => (
              <View
                style={[
                  styles.dot,
                  currentStep === item && { backgroundColor: '#fff' },
                ]}
                key={item}
              />
            ))}
          </View>

          <Text style={styles.welcomeText}>
            {currentStep === 1
              ? `HI, I'M ARIA SKY, YOUR PERSONAL GUIDE TO NEW ZEALAND!`
              : currentStep === 2
              ? `CHOOSE AND SAVE YOUR FAVORITE PLACES!`
              : `TEST YOUR KNOWLEDGE IN OUR QUIZ!`}
          </Text>

          <LargeGradientButton
            onPress={handleNextStep}
            title={
              currentStep === 1
                ? `HELLO, ARIA SKY`
                : currentStep === 2
                ? `CONTINUE`
                : `START`
            }
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
    paddingTop: height * 0.054,
    paddingBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
  },
  pagination: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 40,
    marginBottom: 23,
  },
  welcomeText: {
    fontFamily: 'Poppins-Black',
    fontSize: 24,
    color: '#fff',
    marginBottom: 17,
    minHeight: 110,
  },
  gradientButton: {
    width: '55%',
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,

    shadowColor: 'rgba(255, 255, 255, 0.15)',
    shadowOffset: { width: 10, height: 30 },
    shadowOpacity: 0.7,
    shadowRadius: 12,
    elevation: 14,
  },
  gradientButtonText: {
    fontFamily: 'Poppins-Black',
    fontSize: 15,
    color: '#fff',
  },
});

export default Onboard;
