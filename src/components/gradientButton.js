import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Shadow } from 'react-native-shadow-2';

// This button uses react-native-shadow-2 for layered shadows.
// Each shadow is rendered as a separate Shadow component behind the LinearGradient button.
// The "inset" shadow is simulated with an overlay inside the gradient.

const LinearGradientButton = ({ children, style, ...props }) => (
  <View style={styles.shadowWrapper}>
    {/* Layer each shadow using Shadow component */}

    {/* Button */}
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.buttonWrapper}
      {...props}
    >
      <LinearGradient
        colors={['#FF6B6B', '#FFD93D']} // Replace with your colors
        style={[styles.gradient, style]}
      >
        {children}
        {/* Simulate inset shadow with overlay */}
        <View pointerEvents="none" style={styles.insetShadow} />
      </LinearGradient>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  shadowWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  absoluteShadow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  shadowLayer: {
    width: 200, // Set your button width
    height: 50, // Set your button height
    borderRadius: 8,
  },
  buttonWrapper: {
    zIndex: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  gradient: {
    width: 200, // Set your button width
    height: 50, // Set your button height
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insetShadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.25)',
    opacity: 0.22,
  },
});

export default LinearGradientButton;
