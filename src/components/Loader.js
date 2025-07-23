import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { WebView } from 'react-native-webview';

const { height } = Dimensions.get('window');

const loaderHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Horizontal Bouncing Loader</title>
  <style>
    body {
      background-color: #0C0B0C;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .wrapper {
      width: 120px;
      height: 60px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .circle {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #fff;
      position: relative;
      animation: bounceUp .6s ease-in-out infinite alternate;
    }

    .circle:nth-child(2) {
      animation-delay: 0.2s;
    }

    .circle:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes bounceUp {
      0% {
        transform: translateY(0);
        height: 20px;
      }
      100% {
        transform: translateY(-30px);
        height: 25px;
      }
    }

    .shadow {
      width: 20px;
      height: 4px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 0;
      filter: blur(2px);
      animation: shadowScale .6s ease-in-out infinite alternate;
    }

    .shadow:nth-child(4) {
      left: 0%;
      animation-delay: 0s;
    }

    .shadow:nth-child(5) {
      left: 50%;
      transform: translateX(-50%);
      animation-delay: 0.2s;
    }

    .shadow:nth-child(6) {
      right: 0%;
      animation-delay: 0.4s;
    }

    @keyframes shadowScale {
      0% {
        transform: scaleX(1);
        opacity: 0.8;
      }
      100% {
        transform: scaleX(0.5);
        opacity: 0.4;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>

    <div class="shadow"></div>
    <div class="shadow"></div>
    <div class="shadow"></div>
  </div>
</body>
</html>
`;

const Loader = () => {
  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();

      return () => Orientation.unlockAllOrientations();
    }, []),
  );

  return (
    <View style={{ flexGrow: 1 }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{
            position: 'absolute',
            zIndex: 20,
            top: height * 0.08,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <WebView
          originWhitelist={['*']}
          source={{ html: loaderHTML }}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    </View>
  );
};

export default Loader;
