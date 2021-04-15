import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button, Image, Platform, CameraRoll, Alert
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {dirPicutures} from "./dirStorage";
import SvgUri from 'react-native-svg-uri';
import Process from '../../images/icons/process.svg'
import Retake from '../../images/icons/retake.svg'
import Save from '../../images/icons/save.svg'

const moment = require('moment');

const RNFS = require('react-native-fs');


const moveAttachment = async (filePath, newFilepath) => {
    return new Promise((resolve, reject) => {
        RNFS.mkdir(dirPicutures)
            .then(() => {
                RNFS.moveFile(filePath, newFilepath)
                    .then(() => resolve(true))
                    .catch(error => reject(error));
            })
            .catch(err => reject(err));
    });
};

class ImagePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageUri: props.route.params.imgUri,
            width: 0,
            height: 0,
        };
    }

    componentDidMount() {
        // Image.getSize(this.props.route.params.imgUri.uri,(width, height) =>{
        //     console.log(width*90/(100*wp),height)
        // })
    }

    saveImage = async (filePath) => {
        try {
            console.log(filePath)
            // set new image name and filepath
            const newImageName = `${moment().format('DDMMYY_HHmmSSS')}.jpg`;
            const newFilepath = `${dirPicutures}/${newImageName}`;
            // move and save image to new filepath
            console.log(newFilepath)
            const imageMoved = await moveAttachment(filePath, newFilepath);
            console.log('image moved', imageMoved);
        } catch (error) {
            console.log(error);
        }
    };

    closeClick = () => {
        Alert.alert(
            'GO BACK',
            '',
            [
                {text: 'NO', style: 'cancel'},
                {text: 'YES', onPress: () => this.props.navigation.navigate('Camera')},
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={[styles.imagePrev, styles.centerItems]}>
                    <ImageBackground
                        source={{uri: `data:image/jpeg;base64,${this.props.route.params.imgUri}`}}
                        // source={require(this.props.navigation.state.params.imgUri)}
                        style={{width: wp('90%'), height: hp('85%')}} resizeMode={'contain'}/>
                </View>
                <View style={[styles.toolBar, styles.centerItems]}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={() => this.closeClick()}>
                            <View>
                            <Process
                                // source={require('../../images/icons/process.svg')}
                                style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.push('Pre-process', {imgUri: this.props.route.params.imgUri})}>
                            <View>
                                <Retake
                                    // source={require('../../images/icons/process.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.saveImage(this.props.route.params.imgUri)}>
                            <View>
                                <Save
                                    // source={require('../../images/icons/process.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </View>
                        </TouchableOpacity>
                    </View>

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
        flex: 1, flexDirection: 'row',
        padding: 10,
    }


});
export default ImagePreview;
