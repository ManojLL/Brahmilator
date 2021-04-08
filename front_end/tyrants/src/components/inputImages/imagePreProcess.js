import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
    LogBox,
} from 'react-native';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Col, Row, Grid } from 'react-native-easy-grid';
import SvgUri from 'react-native-svg-uri';

LogBox.ignoreAllLogs();
class ImagePreProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    closeClick = () => {
        Alert.alert(
            'GO BACK',
            '',
            [
                { text: 'NO', style: 'cancel' },
                { text: 'YES', onPress: () => this.props.navigation.navigate('Home') },
            ]
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.toolBar, styles.centerItems]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.closeClick()}>
                            <SvgUri
                                source={require('../../images/icons/close.svg')}
                                style={{ width: wp('7%'), height: hp('3%'), marginLeft: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Main-Menu', { imgUri: this.props.route.params.imgUri })}>
                            <SvgUri
                                source={require('../../images/icons/retake.svg')}
                                style={{ width: wp('7%'), height: hp('3%'), marginRight: 20, marginTop: 8 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
                            <SvgUri
                                source={require('../../images/icons/process.svg')}
                                style={{ width: wp('7%'), height: hp('3%'), marginRight: 20, marginTop: 8 }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={[styles.imagePrev, styles.centerItems]}>
                    <ImageBackground
                        source={{ uri: this.props.route.params.imgUri.uri }}
                        style={{ width: wp('90%'), height: hp("70%"), marginTop: 10 }} resizeMode={'contain'} />
                </View>


                <View style={[styles.toolBar, styles.centerItems]}>
                    <Grid>
                        <Row>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <SvgUri
                                        source={require('../../images/icons/exposure.svg')}
                                        style={{ width: wp('11%'), height: hp('5%') }} />
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <SvgUri
                                        source={require('../../images/icons/threshold.svg')}
                                        style={{ width: wp('11%'), height: hp('5%') }} />
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <SvgUri
                                        source={require('../../images/icons/erosion.svg')}
                                        style={{ width: wp('11%'), height: hp('5%') }} />
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <SvgUri
                                        source={require('../../images/icons/morph.svg')}
                                        style={{ width: wp('11%'), height: hp('5%') }} />
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <SvgUri
                                        source={require('../../images/icons/dialation.svg')}
                                        style={{ width: wp('11%'), height: hp('5%') }} />
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
        flex: 1, flexDirection: 'row',
        padding: 6,
    },


});
export default ImagePreProcess;

