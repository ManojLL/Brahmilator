/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import ImagePreview from './src/components/inputImages/imagePreview'
import Home from './src/components/home/Home';
import InputImg from './src/components/inputImages/inputImage'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Home: {screen: Home, navigationOptions: {headerShown: false}},
  PreviewImg: {screen: ImagePreview, navigationOptions: {headerShown: false}},
});

const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
