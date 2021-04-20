/* eslint-disable react-native/no-inline-styles */
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  LogBox,
  Platform,
  Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Save from '../../images/icons/save.svg';
import Close from '../../images/icons/close.svg';
import Closing from '../../images/icons/closing.svg';
import Retake from '../../images/icons/retake.svg';
import Process from '../../images/icons/process.svg';
import Threshold from '../../images/icons/threshold.svg';
import Erosion from '../../images/icons/erosion.svg';
import Opening from '../../images/icons/opening.svg';
import Dialation from '../../images/icons/dialation.svg';
import Instructions from '../../images/icons/instructions.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Col, Row, Grid} from 'react-native-easy-grid';

import OpenCV from '../NativeModules/OpenCV';

LogBox.ignoreAllLogs();

class ImagePreProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closingModal: false,
      closingValue: 0,
      thresholdModal: false,
      thresholdValue: 0,
      erosionModal: false,
      erosionValue: 0,
      openingModel: false,
      openingValue: 0,
      dilationModal: false,
      dilationValue: 0,
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

  // useEffect(() => {
  //   // handleRegistration();
  // }, []);

  resetStatus() {
    this.setState({thresholdValue: 0});
    this.setState({openingValue: 0});
    this.setState({erosionValue: 0});
    this.setState({dilationValue: 0});
    this.setState({closingValue: 0});
    this.setState({imgUri: this.state.originalImg});
  }

  preProcess(
    imageAsBase64,
    thresholdValue,
    openingValue,
    erosionValue,
    dilationValue,
    closingValue,
  ) {
    console.log('threshold value : ', thresholdValue);
    console.log('Opening(op) value : ', openingValue);
    console.log('erosion value   : ', erosionValue);
    console.log('dialation value : ', dilationValue);
    console.log('smoothing value : ', closingValue);
    console.log();
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        OpenCV.preProcess(
          imageAsBase64,
          thresholdValue,
          openingValue,
          erosionValue,
          dilationValue,
          closingValue,
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
          dilationValue,
          closingValue,
          (error, dataArray) => {
            resolve(dataArray[0]);
          },
        );
      }
    });
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
                  this.state.dilationValue,
                  this.state.closingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 60}}>
                {' '}
                Threshold Value : {this.state.thresholdValue}
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
                  this.state.dilationValue,
                  this.state.closingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 75}}>
                {' '}
                Erosion Value : {this.state.erosionValue}
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

        {/* Opening Modal*/}

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
                this.setState({openingValue: value});

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  value,
                  this.state.erosionValue,
                  this.state.dilationValue,
                  this.state.closingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 20}}>
                {' '}
                Opening Value : {this.state.openingValue}
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
          visible={this.state.dilationModal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={0}
              step={1}
              value={this.state.dilationValue}
              maximumValue={21}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({dilationValue: value});

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  this.state.openingValue,
                  this.state.erosionValue,
                  value,
                  this.state.closingValue,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 75}}>
                {' '}
                Dilation Value : {this.state.dilationValue}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({dilationModal: false})}>
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

        {/* Closing Modal */}

        <Modal
          transparent={true}
          animationType={'none'}
          visible={this.state.closingModal}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View style={styles.modal}>
            <Slider
              style={{width: wp('70%'), height: hp('9%')}}
              minimumValue={0}
              step={1}
              value={this.state.closingValue}
              maximumValue={31}
              minimumTrackTintColor="#FFC542"
              maximumTrackTintColor="#FFFFFF"
              onValueChange={(value) => {
                this.setState({closingValue: value});

                this.preProcess(
                  this.state.imgUri,
                  this.state.thresholdValue,
                  this.state.openingValue,
                  this.state.erosionValue,
                  this.state.dilationValue,
                  value,
                );
              }}
            />

            <View style={styles.modalItems}>
              <Text style={{color: '#ffffff', marginRight: 55}}>
                {' '}
                Closing Value : {this.state.closingValue}
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({closingModal: false})}>
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
            {/* Segement and classify Images */}
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

            {/* Instructions to Pre-process */}
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('PreProcessInfo');
              }}>
              <View>
                <Instructions
                  // source={require('../../images/icons/Instructions.svg')}
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
                        marginLeft: 12,
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
                        marginTop: 2,
                        marginLeft: 15,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </Col>
              <Col style={styles.alignCenter}>
                <TouchableOpacity
                  onPress={() => this.setState({dilationModal: true})}>
                  <View>
                    <Dialation
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
                  onPress={() => this.setState({openingModel: true})}>
                  <View>
                    <Opening
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
                  onPress={() => this.setState({closingModal: true})}>
                  <View>
                    <Closing
                      style={{
                        width: wp('11%'),
                        height: hp('5%'),
                        marginLeft: 10,
                        marginTop: -1,
                      }}
                    />
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
