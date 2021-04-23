import React from 'react';
import {Pressable, Text, View} from 'react-native';

import Animated, {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Easing,
} from 'react-native-reanimated';

const CONFETII_NUMBER = 20;
const CONFETII_SIZE = 15;
const COLORS = ['#00e4b2', '#09aec5', '#107ed5'];

const SingleElement = (positionX, positionY, i, opacity) => {
  const animateStyle = useAnimatedStyle(() => {
    return {
      zIndex: -1,
      opacity: withSequence(
        withTiming(interpolate(opacity.value, [0, 1], [0.5, 1]), 200),
        withDelay(180, withTiming(0, {duration: 200})),
      ),
      transform: [
        {
          translateX: withSequence(
            withTiming(positionX.value * Math.random(), {
              duration: 400,
              easing: Easing.bezier(0, 0.68, 0.39, 1.01),
            }),
            withDelay(200, withTiming(0)),
          ),
        },
        {
          translateY: withSequence(
            withTiming(positionY.value * Math.random(), {
              duration: 400,
              easing: Easing.bezier(0, 0.68, 0.39, 1.01),
            }),
            withDelay(200, withTiming(0)),
          ),
        },
        {
          rotateZ: withTiming(40),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          height: CONFETII_SIZE,
          width: CONFETII_SIZE / 2,
          position: 'absolute',
          left: 25,
          top: 25,
          opacity: 1,
          backgroundColor: COLORS[i % COLORS.length],
        },
        animateStyle,
      ]}
    />
  );
};

const CreateConfetti = (positionX, positionY, opacity) => {
  return [...new Array(CONFETII_NUMBER)].map((_, i) => {
    return SingleElement(positionX, positionY, i, opacity);
  });
};

export const NormalAnimation = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const touchIcon = useSharedValue(1);

  const animateIcon = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(touchIcon.value)}],
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 24}}>Normal</Text>
      <Pressable
        onPressIn={() => {
          touchIcon.value = 0.8;
          positionX.value = 0;
          positionY.value = 0;
          opacity.value = 0;
        }}
        onPressOut={() => {
          touchIcon.value = 1;
          positionX.value = 100;
          positionY.value = -50;
          opacity.value = 1;
        }}>
        <Animated.View style={[animateIcon]}>
          <Text style={{fontSize: 60}}>🎉</Text>
        </Animated.View>
        {CreateConfetti(positionX, positionY, opacity)}
      </Pressable>
    </View>
  );
};
