import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LargeGradientButton = ({ onPress, title }) => {
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
        style={styles.gradientButton}
      >
        <Text style={styles.gradientButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientButton: {
    width: 187,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 1000,
    marginTop: 17,

    shadowColor: 'rgba(255, 255, 255, 0.43)',
    shadowOffset: { width: 8, height: 20 },
    shadowOpacity: 0.6,
    shadowRadius: 19,
    elevation: 15,
    backgroundColor: '#D8AD4A',
  },
  gradientButtonText: {
    fontFamily: 'Poppins-Black',
    fontSize: 15,
    color: '#fff',
  },
  pulse: {
    position: 'absolute',
    left: -3,
    top: 13,
    width: 192,
    height: 85,
    borderRadius: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    opacity: 0.4,
    zIndex: -1,
  },
});

export default LargeGradientButton;
