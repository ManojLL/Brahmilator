import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class ImagePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={[styles.imagePrev, styles.centerItems]}>
                    <ImageBackground
                        source={require('../../images/backgroundImages/inc.png')}
                        style={{ width: wp('90%'), height: hp("70%") }} />
                </View>
                <View style={[styles.toolBar,styles.centerItems]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.5}
                                    onPress={() => this.props.navigation.navigate('Camera')}>
                    <ImageBackground
                        source={require('../../images/icons/retake.png')}
                        style={{ width:   wp('7%'), height: hp('3%'),marginLeft:20  }} />
                       </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.push('Pre-process')}>
                    <ImageBackground
                        source={require('../../images/icons/process.png')}
                        style={{width:   wp('7%'), height: hp('3%'),marginRight:20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/save.png')}
                        style={{width:  wp('7%'), height: hp('3%'),marginRight:20 }} />
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
        padding:10,
    }


});
export default ImagePreview;
