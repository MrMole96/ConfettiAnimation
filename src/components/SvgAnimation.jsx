import React from 'react';
import {View, Text, Pressable} from 'react-native';
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
  useAnimatedProps,
  useDerivedValue,
} from 'react-native-reanimated';

import Icon1 from '../assets/icon1.svg';
import Icon2 from '../assets/icon2.svg';
import Icon3 from '../assets/icon3.svg';
import Icon4 from '../assets/icon4.svg';

const NUMBER_ELEMENTS = 10;

const SingleElement = ({
  opacity,
  transitionX,
  transitionY,
  random,
  shakeFlag,
}) => {
  const derivedX = useDerivedValue(() => {
    return transitionX.value * Math.random();
  }, []);

  const derivedY = useDerivedValue(() => {
    return transitionY.value * Math.random();
  }, []);

  const styleAnimate = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateX: withSequence(
            withTiming(derivedX.value, {
              duration: 400,
              easing: Easing.bezier(0, 0.68, 0.39, 1.01),
            }),
            withDelay(380, withTiming(0)),
          ),
        },
        {
          translateY: withSequence(
            withTiming(derivedY.value, {
              duration: 400,
              easing: Easing.bezier(0, 0.68, 0.39, 1.01),
            }),
            withDelay(380, withTiming(0)),
          ),
        },
      ],
    };
  });

  const Icon = () => {
    switch (random) {
      case 1:
        return <Icon1 />;
      case 2:
        return <Icon2 />;
      case 3:
        return <Icon3 />;
      case 4:
        return <Icon4 />;
    }
  };
  return (
    <Animated.View
      style={[
        {
          zIndex: 1,
          position: 'absolute',
          top: 10,
          left: 10,
          height: 50,
          width: 50,
        },
        styleAnimate,
      ]}>
      <Icon />
    </Animated.View>
  );
};

const CreateElements = props => {
  return [...new Array(NUMBER_ELEMENTS)].map((_, i) => {
    let random = Math.floor(Math.random() * 4) + 1;
    return <SingleElement {...props} random={random} />;
  });
};

export const SvgAnimation = () => {
  const touch = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(0);
  const transitionX = useSharedValue(0);
  const transitionY = useSharedValue(0);

  const shakeFlag = useSharedValue(false);

  const pressStyleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{scale: touch.value}, {rotateZ: `${rotate.value}deg`}],
    };
  });

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 24}}>SVG</Text>
        <Pressable
          onPressIn={() => {
            touch.value = withTiming(0.8, {duration: 500});
            transitionY.value = 0;
            transitionX.value = 0;
          }}
          onLongPress={() => {
            shakeFlag.value = true;
            rotate.value = withRepeat(
              withTiming(10, {duration: 100}),
              -1,
              true,
            );
          }}
          onPressOut={() => {
            if (shakeFlag.value) {
              rotate.value = 0;
              transitionX.value = 100;
              transitionY.value = -100;
            } else {
              transitionX.value = 50;
              transitionY.value = -50;
            }

            touch.value = withSpring(1);
            shakeFlag.value = false;
            opacity.value = withSequence(
              withTiming(1, {duration: 0}),
              withDelay(580, withTiming(0, {duration: 200})),
            );
          }}>
          <Animated.View style={[pressStyleAnimation]}>
            <Text style={{fontSize: 60}}>🎉</Text>
          </Animated.View>
          <CreateElements
            opacity={opacity}
            transitionX={transitionX}
            transitionY={transitionY}
            shakeFlag={shakeFlag}
          />
        </Pressable>
      </View>
    </>
  );
};
