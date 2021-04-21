/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Text,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {dirPicutures} from './dirStorage';
import Process from '../../images/icons/process.svg';
import Retake from '../../images/icons/retake.svg';

const moment = require('moment');

const RNFS = require('react-native-fs');

const moveAttachment = async (filePath, newFilepath) => {
  return new Promise((resolve, reject) => {
    RNFS.mkdir(dirPicutures)
      .then(() => {
        RNFS.moveFile(filePath, newFilepath)
          .then(() => resolve(true))
          .catch((error) => reject(error));
      })
      .catch((err) => reject(err));
  });
};

class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ImageUri: props.route.params.imgUri,
      width: 0,
      height: 0,
      find: false,
      canTranslate: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.validateImage();
  }

  validateImage = async () => {
    this.setState({isLoading: true});
    const data = {image: this.props.route.params.imgUri};
    try {
      await fetch(
        'https://brahmilator-ssqj6ij3rq-as.a.run.app/api/validatePlate',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({isLoading: false});
          if (json.status_code === '200') {
            if (json.outPut === 'True') {
              this.setState({
                canTranslate: true,
              });
            }
          } else {
            this.setState({isLoading: false});
            alert('Not a Valid Inscription');
            this.props.navigation.navigate('Camera');
          }
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log('upload error', error);
          alert('Upload Failed!');
        });
    } catch (error) {
      console.error(error);
    }
  };

  saveImage = async (filePath) => {
    try {
      console.log(filePath);
      // set new image name and filepath
      const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
      const newFilepath = `${dirPicutures}/${newImageName}`;
      // move and save image to new filepath
      console.log(newFilepath);
      const imageMoved = await moveAttachment(filePath, newFilepath);
      console.log('image moved', imageMoved);
    } catch (error) {
      console.log(error);
    }
  };

  closeClick = () => {
    Alert.alert('Do you want to go back?', '', [
      {text: 'No', style: 'cancel'},
      {text: 'Yes', onPress: () => this.props.navigation.navigate('Camera')},
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <View style={[styles.centerTexts]}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{color: '#ffffff', marginLeft: 8, marginTop: 5}}>
              Processing..
            </Text>
          </View>
        ) : (
          <View>
            {this.state.canTranslate ? (
              <View style={styles.container}>
                <View style={[styles.imagePrev, styles.centerItems]}>
                  <ImageBackground
                    source={{
                      uri: `data:image/jpeg;base64,${this.props.route.params.imgUri}`,
                    }}
                    // source={require(this.props.navigation.state.params.imgUri)}
                    style={{width: wp('90%'), height: hp('85%')}}
                    resizeMode={'contain'}
                  />
                </View>
                <View style={[styles.toolBar, styles.centerItems]}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => this.closeClick()}>
                      <View>
                        <Process
                          // source={require('../../images/icons/process.svg')}
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
                        this.props.navigation.push('Pre-process', {
                          imgUri: this.props.route.params.imgUri,
                        })
                      }>
                      <View>
                        <Retake
                          // source={require('../../images/icons/process.svg')}
                          style={{
                            width: wp('7%'),
                            height: hp('3%'),
                            marginRight: 10,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    height: '100%',
  },
  centerTexts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
export default ImagePreview;
