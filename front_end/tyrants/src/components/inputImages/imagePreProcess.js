/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Button,
  LogBox,
  Platform,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Save from '../../images/icons/save.svg';
import Close from '../../images/icons/close.svg';
import Exposer from '../../images/icons/exposure.svg';
import Retake from '../../images/icons/retake.svg';
import Process from '../../images/icons/process.svg';
import Threshold from '../../images/icons/threshold.svg';
import Erosion from '../../images/icons/erosion.svg';
import Morph from '../../images/icons/morph.svg';
import Dialation from '../../images/icons/dialation.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Col, Row, Grid} from 'react-native-easy-grid';
import SvgUri from 'react-native-svg-uri';

import OpenCV from '../NativeModules/OpenCV';

LogBox.ignoreAllLogs();

class ImagePreProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exposureModal: false,
      exposureValue: 0,
      thresholdModal: false,
      thresholdValue: 0,
      erosionModal: false,
      erosionValue: 0,
      openingModel: false,
      openingValue: 0,
      dialationModal: false,
      dialationValue: 0,
      imgUri: props.route.params.imgUri,
    };
  }

  closeClick = () => {
    Alert.alert('Go Back to Previous', '', [
      {text: 'No', style: 'cancel'},
      {text: 'Yes', onPress: () => this.props.navigation.navigate('Home')},
    ]);
  };

  preProcess(imageAsBase64, thresholdValue, openingValue, erosionValue) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.preProcess(
          imageAsBase64,
          thresholdValue,
          openingValue,
          erosionValue,
          (error) => {
            // error handling
            console.log('returned base64 ERROR process : ', error);
          },
          (msg) => {
            // successCallback gives the correct return String
            resolve(msg);
            this.setState({imgUri: msg});
            console.log('returned base64 string process : Returned');
          },
        );
      } else {
        OpenCV.preProcess(
          imageAsBase64,
          thresholdValue,
          openingValue,
          erosionValue,
          (error, dataArray) => {
            resolve(dataArray[0]);
          },
        );
      }
    });
  }

  resetStatus() {
    this.state = {
      exposureModal: false,
      exposureValue: 0,
      thresholdModal: false,
      thresholdValue: 0,
      erosionModal: false,
      erosionValue: 0,
      openingModel: false,
      morphValue: 0,
      dialationModal: false,
      dialationValue: 0,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {/* exposureModal*/}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.exposureModal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={-1}
              step={1}
              value={0}
              maximumValue={1}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({exposureValue: value});
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff'}}> exposure </Text>
              <TouchableOpacity
                onPress={() => this.setState({exposureModal: false})}>
                <View>
                  <Save
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({exposureModal: false})}>
                <View>
                  <Close
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* thresholdModal*/}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.thresholdModal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={0}
              step={1}
              value={0}
              maximumValue={255}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({thresholdValue: value});
                console.log('threshold value : ', value);
                console.log('morph(op) value : ', this.state.openingValue);
                console.log('erosion value   : ', this.state.erosionValue);
                console.log('dialation value : ', this.state.dialationValue);

                this.preProcess(
                  this.state.imgUri,
                  value,
                  this.state.openingValue,
                  this.state.erosionValue,
                  this.state.dialationValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff'}}> threshold </Text>
              <TouchableOpacity
                onPress={() => this.setState({thresholdModal: false})}>
                <View>
                  <Save
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({thresholdModal: false})}>
                <View>
                  <Close
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* erosionModal*/}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.erosionModal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={0}
              step={1}
              value={0}
              maximumValue={21}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({erosionValue: value});
                console.log('threshold value : ', this.state.thresholdValue);
                console.log('morph value(op) : ', this.state.openingValue);
                console.log('erosion value   : ', value);
                console.log('dialation value : ', this.state.dialationValue);

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  this.state.openingValue,
                  value,
                  this.state.dialationValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff'}}> erosion </Text>
              <TouchableOpacity
                onPress={() => this.setState({erosionModal: false})}>
                <View>
                  <Save
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({erosionModal: false})}>
                <View>
                  <Close
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* openingModel*/}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.openingModel}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={0}
              step={1}
              value={0}
              maximumValue={21}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({morphValue: value});
                console.log('threshold value : ', this.state.thresholdValue);
                console.log('morph value(op) : ', value);
                console.log('erosion value   : ', this.state.erosionValue);
                console.log('dialation value : ', this.state.dialationValue);
                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  value,
                  this.state.erosionValue,
                  this.state.dialationValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff'}}> morph </Text>
              <TouchableOpacity
                onPress={() => this.setState({openingModel: false})}>
                <View>
                  <Save
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({openingModel: false})}>
                <View>
                  <Close
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* dialationModal*/}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.dialationModal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={-1}
              step={1}
              value={0}
              maximumValue={1}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({dialationValue: value});
                console.log('threshold value : ', this.state.thresholdValue);
                console.log('morph value(op) : ', this.openingValue);
                console.log('erosion value   : ', this.state.erosionValue);
                console.log('dialation value : ', this.state.dialationValue);
                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  this.state.openingValue,
                  this.state.erosionValue,
                  value,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff'}}> dialation </Text>
              <TouchableOpacity
                onPress={() => this.setState({dialationModal: false})}>
                <View>
                  <Save
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.setState({dialationModal: false})}>
                <View>
                  <Close
                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View style={[styles.toolBar, styles.centerItems]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.closeClick()}>
              <View>
                <Close
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginLeft: 20,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Main-Menu', {
                  imgUri: this.props.route.params.imgUri,
                })
              }>
              <View>
                <Retake
                  // source={require('../../images/icons/retake.svg')}
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginRight: 20,
                    marginTop: 8,
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* Resets procssed image */}
            <TouchableOpacity
              onPress={() => {
                this.setState({imgUri: this.imgUri});
                // this.resetStatus();
              }}>
              <View>
                <Process
                  // source={require('../../images/icons/retake.svg')}
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginRight: 20,
                    marginTop: 8,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Image Preview */}
        <View style={[styles.imagePrev, styles.centerItems]}>
          <ImageBackground
            source={{uri: `data:image/jpeg;base64,${this.state.imgUri}`}}
            style={{width: wp('90%'), height: hp('70%'), marginTop: 10}}
            resizeMode={'contain'}
          />
        </View>

        <View style={[styles.toolBar, styles.centerItems]}>
          <Grid>
            <Row>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({exposureModal: true})}>
                  <View>
                    <Exposer style={{width: wp('11%'), height: hp('5%')}} />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({thresholdModal: true})}>
                  <View>
                    <Threshold style={{width: wp('11%'), height: hp('5%')}} />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({erosionModal: true})}>
                  <View>
                    <Erosion style={{width: wp('11%'), height: hp('5%')}} />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({openingModel: true})}>
                  <View>
                    <Morph style={{width: wp('11%'), height: hp('5%')}} />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({dialationModal: true})}>
                  <View>
                    <Dialation style={{width: wp('11%'), height: hp('5%')}} />
                  </View>
                </TouchableOpacity>
              </Col>
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
    height: '100%',
  },
  centerItems: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePrev: {
    height: '85%',
  },
  toolBar: {
    backgroundColor: '#000',
    height: '15%',
    flex: 1,
    flexDirection: 'row',
    padding: 6,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp('8%'),
    height: hp('10%'),
    alignItems: 'center',
  },
  modalItems: {
    flexDirection: 'row',
  },
});
export default ImagePreProcess;
