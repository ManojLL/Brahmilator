/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import ImagePreview from './src/components/inputImages/imagePreview';
import Home from './src/components/home/Home';
import InputImg from './src/components/inputImages/inputImage';
import {createAppContainer} from 'react-navigation';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';
// const AppNavigator = createStackNavigator({
//   Home: {screen: Home, navigationOptions: {headerShown: false}},
//   PreviewImg: {screen: ImagePreview, navigationOptions: {headerShown: false}},
// });
const Stack = createStackNavigator();

// const AppContainer = createAppContainer(AppNavigator);
export default class App extends Component {
  render() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false ,cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Preview" component={ImagePreview} />
                <Stack.Screen name="Camera" component={InputImg} />
            </Stack.Navigator>
        </NavigationContainer>);
  }
}
