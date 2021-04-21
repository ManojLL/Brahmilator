import React, {Component} from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BrahmiLogo from '../../images/icons/brahmiLogo.svg';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.replace('Home');
    }, 3000);
  }
  render() {
    return (
      <View style={styles.container}>
        <BrahmiLogo style={styles.img} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: wp('20%'),
    height: hp('30%'),
  },
});
