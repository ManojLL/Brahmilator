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
      smoothingModal: false,
      smoothingValue: 0,
      thresholdModal: false,
      thresholdValue: 0,
      erosionModal: false,
      erosionValue: 0,
      openingModel: false,
      openingValue: 0,
      dialationModal: false,
      dialationValue: 0,
      imgUri: this.props.route.params.imgUri,
      originalImg: this.props.route.params.imgUri,
    };
  }

  closeClick = () => {
    Alert.alert('Go Back to Previous', '', [
      {text: 'No', style: 'cancel'},
      {text: 'Yes', onPress: () => this.props.navigation.navigate('Home')},
    ]);
  };

  preProcess(
    imageAsBase64,
    thresholdValue,
    openingValue,
    erosionValue,
    dialationValue,
    smoothingValue,
  ) {
    console.log('threshold value : ', thresholdValue);
    console.log('morph(op) value : ', openingValue);
    console.log('erosion value   : ', erosionValue);
    console.log('dialation value : ', dialationValue);
    console.log('smoothing value : ', smoothingValue);
    console.log();
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.preProcess(
          imageAsBase64,
          thresholdValue,
          openingValue,
          erosionValue,
          dialationValue,
          smoothingValue,
          (error) => {
            // error handling
            console.log('returned base64 ERROR process : ', error);
          },
          (msg) => {
            // successCallback gives the correct return String
            resolve(msg);
            this.setState({imgUri: msg});
          },
        );
      } else {
        OpenCV.preProcess(
          imageAsBase64,
          thresholdValue,
          openingValue,
          erosionValue,
          dialationValue,
          smoothingValue,
          (error, dataArray) => {
            resolve(dataArray[0]);
          },
        );
      }
    });
  }

  resetStatus() {
    this.state = {
      smoothingModal: false,
      smoothingValue: 0,
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
              value={this.state.thresholdValue}
              maximumValue={255}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({thresholdValue: value});

                this.preProcess(
                  this.state.imgUri,
                  value,
                  this.state.openingValue,
                  this.state.erosionValue,
                  this.state.dialationValue,
                  this.state.smoothingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 60}}>
                {' '}
                Threshold Value - {this.state.thresholdValue}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({thresholdModal: false})}>
                <View>
                  <Save
                    style={{
                      width: wp('7%'),
                      height: hp('3%'),
                      marginLeft: 50,
                      marginTop: 2,
                    }}
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
              value={this.state.erosionValue}
              maximumValue={21}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({erosionValue: value});

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  this.state.openingValue,
                  value,
                  this.state.dialationValue,
                  this.state.smoothingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 75}}>
                {' '}
                Erosion Value - {this.state.erosionValue}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({erosionModal: false})}>
                <View>
                  <Save
                    style={{
                      width: wp('7%'),
                      height: hp('3%'),
                      marginLeft: 50,
                      marginTop: 2,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Morph Modal*/}

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
              value={this.state.openingValue}
              maximumValue={21}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({morphValue: value});

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  value,
                  this.state.erosionValue,
                  this.state.dialationValue,
                  this.state.smoothingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 20}}>
                {' '}
                Morph(Opening) Value - {this.state.openingValue}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({openingModel: false})}>
                <View>
                  <Save
                    style={{
                      width: wp('7%'),
                      height: hp('3%'),
                      marginLeft: 50,
                      marginTop: 2,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Dialation Modal*/}

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
              minimumValue={0}
              step={1}
              value={this.state.dialationValue}
              maximumValue={21}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({dialationValue: value});

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  this.state.openingValue,
                  this.state.erosionValue,
                  value,
                  this.state.smoothingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 75}}>
                {' '}
                Dilation Value - {this.state.dialationValue}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({dialationModal: false})}>
                <View>
                  <Save
                    style={{
                      width: wp('7%'),
                      height: hp('3%'),
                      marginLeft: 50,
                      marginTop: 2,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Smoothing Modal */}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.smoothingModal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={0}
              step={1}
              value={this.state.smoothingValue}
              maximumValue={31}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({smoothingValue: value});

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  this.state.openingValue,
                  this.state.erosionValue,
                  this.state.dialationValue,
                  value,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 55}}>
                {' '}
                Smoothing Value - {this.state.smoothingValue}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({smoothingModal: false})}>
                <View>
                  <Save
                    style={{
                      width: wp('7%'),
                      height: hp('3%'),
                      marginLeft: 50,
                      marginTop: 2,
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Tool Bar */}

        <View style={[styles.toolBar, styles.centerItems]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => this.closeClick()}>
              <View>
                <Close
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginLeft: 10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex: 1, flexDirection: 'row-reverse'}}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Main-Menu', {
                  imgUri: this.state.imgUri,
                })
              }>
              <View>
                <Retake
                  // source={require('../../images/icons/retake.svg')}
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginRight: 10,
                    marginTop: 3,
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* Resets procssed image */}
            <TouchableOpacity
              onPress={() => {
                this.setState({imgUri: this.state.originalImg});
                this.resetStatus();
              }}>
              <View>
                <Process
                  // source={require('../../images/icons/retake.svg')}
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginRight: 15,
                    marginTop: 3,
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* Resets procssed image */}
            <TouchableOpacity
              onPress={() => {
                this.setState({imgUri: this.state.originalImg});
                this.resetStatus();
              }}>
              <View>
                <Process
                  // source={require('../../images/icons/retake.svg')}
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginRight: 15,
                    marginTop: 3,
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
                  onPress={() => this.setState({thresholdModal: true})}>
                  <View>
                    <Threshold
                      style={{
                        width: wp('11%'),
                        height: hp('5%'),
                        marginLeft: 6,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({erosionModal: true})}>
                  <View>
                    <Erosion
                      style={{
                        width: wp('11%'),
                        height: hp('5%'),
                        marginLeft: 15,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({openingModel: true})}>
                  <View>
                    <Morph
                      style={{
                        width: wp('11%'),
                        height: hp('5%'),
                        marginLeft: 10,
                      }}
                    />
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
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({smoothingModal: true})}>
                  <View>
                    <Exposer style={{width: wp('11%'), height: hp('5%')}} />
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
    padding: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: hp('10%'),
    height: hp('10%'),
    alignItems: 'center',
  },
  modalItems: {
    flexDirection: 'row',
    marginTop: -15,
  },
});
export default ImagePreProcess;
