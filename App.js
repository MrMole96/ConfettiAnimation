/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, View} from 'react-native';

import {NormalAnimation} from './src/components/NormalAnimation';
import {SvgAnimation} from './src/components/SvgAnimation';

const App = () => {
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
