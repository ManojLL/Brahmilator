import React, {Component, useState} from 'react';
import {Col, Row, Grid} from 'react-native-easy-grid';
import SvgUri from 'react-native-svg-uri';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
  Platform,
  Alert,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as ImagePicker from 'react-native-image-picker';
import Flash from '../../images/icons/flash.svg';
import Close from '../../images/icons/close.svg';
import Upload from '../../images/icons/upload.svg';

import RNFS from 'react-native-fs';

import OpenCV from '../NativeModules/OpenCV';

class InputImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      takingPic: false,
      ImageUri: '',
      flash: RNCamera.Constants.FlashMode.off,
    };
  }

  toggleTorch() {
    let tstate = this.state.flash;
    if (tstate === RNCamera.Constants.FlashMode.off) {
      tstate = RNCamera.Constants.FlashMode.on;
    } else {
      tstate = RNCamera.Constants.FlashMode.off;
    }
    this.setState({flash: tstate});
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({takingPic: true});

      try {
        const data = await this.camera.takePictureAsync(options);
        // console.log(data.uri)
        // this.setState({imageUri: data.uri});
        // this.props.navigation.navigate('Preview', {imgUri: data});
        this.convertImg(data.uri);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
      } finally {
        this.setState({takingPic: false});
      }
    }
  };

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        // const source = {uri: response.uri};
        // console.log('response', JSON.stringify(response));
        // this.setState({
        //     imageUri: response.uri,
        // });
        // console.log(response)
        // this.props.navigation.navigate('Preview', {imgUri: response});
        this.convertImg(response.uri);
      }
    });
  };

  convertImg = (path) => {
    RNFS.readFile(path, 'base64').then((res) => {
      this.toGrayscale(res);
      // console.log('returned base64 string: ', img);
      // this.props.navigation.navigate('Preview', {imgUri: res});
    });
  };

  // testing toGrayscale method from OpenCV
  toGrayscale(imageAsBase64) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.toGrayscale(
          imageAsBase64,
          (error) => {
            // error handling
          },
          (msg) => {
            // successCallback gives the correct return String
            resolve(msg);
            console.log('returned base64 string: ', msg);
            // Pass processed image to the next View -> 'Preview'
            this.props.navigation.navigate('Preview', {imgUri: msg});
          },
        );
      } else {
        OpenCV.toGrayscale(imageAsBase64, (error, dataArray) => {
          resolve(dataArray[0]);
        });
      }
    });
  }

  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        this.setState({
          imageUri: response.uri,
        });
        console.log(response);
        this.props.navigation.navigate('Preview', {imgUri: response});
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{height: '85%'}}>
          <RNCamera
            ref={(ref) => {
              this.camera = ref;
            }}
            captureAudio={false}
            style={{flex: 1}}
            type={RNCamera.Constants.Type.back}
            flashMode={this.state.flash}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}>
            <View style={[styles.toolBar]}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                  <View>
                    <Close style={{width: wp('5%'), height: hp('3%')}} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                <TouchableOpacity onPress={() => this.toggleTorch()}>
                  <View>
                    <Flash style={{width: wp('5%'), height: hp('3%')}} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </RNCamera>
        </View>

        <View
          style={[
            {height: '15%', flex: 1, flexDirection: 'row'},
            styles.centerItems,
          ]}>
          <Grid>
            <Row>
              <Col style={styles.alignCenter}>
                <View>
                  <TouchableOpacity
                    style={{}}
                    onPress={this.launchImageLibrary}>
                    <View>
                      <Upload style={{width: wp('8.2%'), height: hp('4%')}} />
                    </View>
                  </TouchableOpacity>
                </View>
              </Col>
              <Col size={2} style={styles.alignCenter}>
                <View>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={this.takePicture}>
                    <View style={[styles.captureBtn, styles.centerItems]}>
                      <View style={[styles.midcap]} />
                    </View>
                  </TouchableOpacity>
                </View>
              </Col>
              <Col style={styles.alignCenter}></Col>
            </Row>
          </Grid>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    height: hp('100%'),
  },
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureBtn: {
    width: wp('20%'),
    height: hp('10.5%'),
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF',
  },
  midcap: {
    backgroundColor: '#ffffff',
    width: wp('18%'),
    height: hp('9.5%'),
    borderRadius: 60,
  },
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBar: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    margin: 10,
  },
});
export default InputImg;
