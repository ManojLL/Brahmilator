/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SvgUri from 'react-native-svg-uri';
import HomePic from '../../images/backgroundImages/homeImg.svg';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Welcome to </Text>
          <View>
            <Text>
              <Text style={styles.specText}>Brahimilator</Text>
              <Text style={styles.text}> Mobile </Text>
            </Text>
          </View>
        </View>
        <View style={styles.subTitle}>
          <Text style={{color: '#fff', fontSize: 15}}>
            Real time Brahmi inscriptions
          </Text>
          <Text style={{color: '#fff', fontSize: 15}}>
            translator at your finger tips
          </Text>
        </View>
        <View style={styles.centerItems}>
          <HomePic
            // source={require('../../images/backgroundImages/homeImg.svg')}
            style={{width: wp('100%'), height: hp('50%'), marginTop: 50}}
          />
        </View>

        <View style={[styles.centerItems]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.push('Camera')}>
            <Text style={{color: '#2E2E2E', fontWeight: 'bold', fontSize: 14}}>
              {'Get Started'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    height: '100%',
  },
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    marginTop: 25,
    width: wp('8%'),
    height: hp('5%'),
  },
  textContainer: {
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: hp('4%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  specText: {
    fontSize: hp('4%'),
    color: '#FFC542',
    fontWeight: 'bold',
  },
  subTitle: {
    color: '#fff',
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: hp('10%'),
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: '#FFC542',
    borderRadius: 15,
  },
});
export default Home;
