/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import SVGIcon from './confetti.svg';

import {NormalAnimation} from './NormalAnimation';
import {SvgAnimation} from './SvgAnimation';

const App = () => {
  const x = useSharedValue(200);
  const touch = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = x.value;
    },
    onActive: (event, ctx) => {
      touch.value = withSpring(0.8);
      x.value = ctx.startX + event.translationX;
    },
    onEnd: _ => {
      touch.value = withSpring(1.2);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: 'red',
      transform: [
        {translateX: x.value},
        {
          scale: touch.value,
        },
      ],
    };
  });

  return (
    <SafeAreaView>
      <View style={{height: '100%'}}>
        <NormalAnimation />
        <SvgAnimation />
      </View>
    </SafeAreaView>
  );
};

export default App;
