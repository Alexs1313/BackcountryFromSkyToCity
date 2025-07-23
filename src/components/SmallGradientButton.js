import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SmallGradientButton = ({ title, onPress, style }) => {
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
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.7}>
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
    width: 90,
    height: 31,
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
    fontSize: 10,
    color: '#fff',
  },
  pulse: {
    position: 'absolute',
    left: -5,
    top: -5,
    width: 100,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    opacity: 0.4,
    zIndex: -1,
  },
});

export default SmallGradientButton;
