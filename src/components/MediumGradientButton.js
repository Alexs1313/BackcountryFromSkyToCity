import { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MediumGradientButton = ({ onPress, type, style }) => {
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

  return (
    <TouchableOpacity style={{}} activeOpacity={0.7} onPress={onPress}>
      <Animated.View style={[styles.pulse, { transform: [{ scale }] }]} />
      <LinearGradient
        colors={['#B48D32', '#D8AD4A']}
        style={[styles.shareButton, style]}
      >
        <Image source={require('../assets/icons/share.png')} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    width: 86,
    height: 53,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,

    shadowColor: 'rgba(255, 255, 255, 0.32)',
    shadowOffset: { width: 6, height: 13 },
    shadowOpacity: 0.75,
    shadowRadius: 13,
    elevation: 14,
    backgroundColor: '#D8AD4A',
  },
  gradientButtonText: {
    fontFamily: 'Poppins-Black',
    fontSize: 15,
    color: '#fff',
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

export default MediumGradientButton;
