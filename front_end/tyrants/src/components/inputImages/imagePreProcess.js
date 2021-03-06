import React, {Component} from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Col, Row, Grid} from 'react-native-easy-grid';

class ImagePreProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    closeClick = ()=>{
        Alert.alert(
            'Alert Title',
            'Alert message here...',
            [
                {text: 'NO',style:  'cancel'},
                {text: 'YES', onPress: () => this.props.navigation.navigate('Home')},
            ]
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.toolBar, styles.centerItems]}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() =>this.closeClick() }>
                            <ImageBackground
                                source={require('../../images/icons/close.png')}
                                style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                        <TouchableOpacity>
                            <ImageBackground
                                source={require('../../images/icons/process.png')}
                                style={{width: wp('7%'), height: hp('3%'), marginRight: 20, marginTop: 8}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
                            <ImageBackground
                                source={require('../../images/icons/retake.png')}
                                style={{width: wp('7%'), height: hp('3%'), marginRight: 20, marginTop: 8}}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={[styles.imagePrev, styles.centerItems]}>
                    <ImageBackground
                        source={{uri:this.props.route.params.imgUri}}
                        style={{width: wp('90%'), height: hp("70%"), marginTop: 10}}/>
                </View>


                <View style={[styles.toolBar, styles.centerItems]}>
                    <Grid>
                        <Row>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <ImageBackground
                                        source={require('../../images/icons/exposure.png')}
                                        style={{width: wp('11%'), height: hp('5%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <ImageBackground
                                        source={require('../../images/icons/threshold.png')}
                                        style={{width: wp('11.6%'), height: hp('4.8%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <ImageBackground
                                        source={require('../../images/icons/erosion.png')}
                                        style={{width: wp('9.6%'), height: hp('4.8%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <ImageBackground
                                        source={require('../../images/icons/morph.png')}
                                        style={{width: wp('8.5%'), height: hp('5.5%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity>
                                    <ImageBackground
                                        source={require('../../images/icons/dialation.png')}
                                        style={{width: wp('9.6%'), height: hp('4.8%')}}/>
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
        padding: 10,
    },


});
export default ImagePreProcess;

