/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import PreProcess from '../../images/icons/homeNav.svg';
import Instructions from '../../images/icons/instructions_yellow.svg';
import CameraIcon from '../../images/icons/camera.svg';

class BottomNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
        }}>
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            backgroundColor: '#333',
            width: wp('18%'),
            height: hp('9.3%'),
            borderRadius: 35,
            bottom: hp('5%'),
            zIndex: 100,
          }}>
          <TouchableOpacity
            style={[styles.button, styles.actionBtn]}
            onPress={() => this.props.navigation.navigate('Camera')}>
            <View>
              <CameraIcon
                style={{
                  width: wp('8%'),
                  height: hp('4%'),
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#2e2e2e',
            border: 2,
            radius: 3,
            shadowColor: '#000000',
            shadowOpacity: 1,
            shadowRadius: 10,
            shadowOffset: {
              height: 25,
              width: 25,
            },
            x: 0,
            y: -10,
            style: {marginVertical: 5},
            bottom: 0,
            width: '100%',
            height: hp('10%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: wp('20%'),
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('imagePreProcess')}>
              <View>
                <PreProcess
                  style={{
                    width: wp('7%'),
                    height: hp('4%'),
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity>
              <View>
                <Instructions
                  style={{
                    width: wp('7%'),
                    height: hp('4%'),
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          {/* </View> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: wp('15.4%'),
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowOpacity: 0.1,
    shadowOffset: {x: 2, y: 0},
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    zIndex: 100,
  },
  actionBtn: {
    backgroundColor: '#FFC542',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
    borderWidth: 3,
    borderColor: '#333',
    zIndex: 100,
  },
});
export default BottomNavigator;
