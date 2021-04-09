import React, {Component, useState} from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
    LogBox, Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Col, Row, Grid} from 'react-native-easy-grid';
import SvgUri from 'react-native-svg-uri';

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
            morphModal: false,
            morphValue: 0,
            dialationModal: false,
            dialationValue: 0,
        };
    }

    closeClick = () => {
        Alert.alert(
            'GO BACK',
            '',
            [
                {text: 'NO', style: 'cancel'},
                {text: 'YES', onPress: () => this.props.navigation.navigate('Home')},
            ]
        );
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
                        console.log('close modal')
                    }}>
                    <View style={styles.modal}>
                        <Slider
                            style={{width: wp('70%'), height: hp('9%')}}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFC542"
                            maximumTrackTintColor="#FFFFFF"
                        />

                        <View style={styles.modalItems}>
                            <Text style={{color:'#ffffff'}}> exposure </Text>
                            <TouchableOpacity onPress={() => this.setState({exposureModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/save.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({exposureModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/close.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
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
                        console.log('close modal')
                    }}>
                    <View style={styles.modal}>
                        <Slider
                            style={{width: wp('70%'), height: hp('9%')}}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFC542"
                            maximumTrackTintColor="#FFFFFF"
                        />


                        <View style={styles.modalItems}>
                            <Text style={{color:'#ffffff'}}> threshold </Text>
                            <TouchableOpacity onPress={() => this.setState({thresholdModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/save.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({thresholdModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/close.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
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
                        console.log('close modal')
                    }}>
                    <View style={styles.modal}>
                        <Slider
                            style={{width: wp('70%'), height: hp('9%')}}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFC542"
                            maximumTrackTintColor="#FFFFFF"
                        />


                        <View style={styles.modalItems}>
                            <Text style={{color:'#ffffff'}}> erosion </Text>
                            <TouchableOpacity onPress={() => this.setState({erosionModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/save.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({erosionModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/close.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* morphModal*/}

                <Modal
                    transparent={true}
                    animationType={'none'}
                    visible={this.state.morphModal}
                    onRequestClose={() => {
                        console.log('close modal')
                    }}>
                    <View style={styles.modal}>
                        <Slider
                            style={{width: wp('70%'), height: hp('9%')}}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFC542"
                            maximumTrackTintColor="#FFFFFF"
                        />


                        <View style={styles.modalItems}>
                            <Text style={{color:'#ffffff'}}> morph </Text>
                            <TouchableOpacity onPress={() => this.setState({morphModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/save.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({morphModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/close.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
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
                        console.log('close modal')
                    }}>
                    <View style={styles.modal}>
                        <Slider
                            style={{width: wp('70%'), height: hp('9%')}}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#FFC542"
                            maximumTrackTintColor="#FFFFFF"
                        />


                        <View style={styles.modalItems}>
                            <Text style={{color:'#ffffff'}}> dialation </Text>
                            <TouchableOpacity onPress={() => this.setState({dialationModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/save.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({dialationModal: false})}>
                                <SvgUri
                                    source={require('../../images/icons/close.svg')}
                                    style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <View style={[styles.toolBar, styles.centerItems]}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.closeClick()}>
                            <SvgUri
                                source={require('../../images/icons/close.svg')}
                                style={{width: wp('7%'), height: hp('3%'), marginLeft: 20}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Main-Menu', {imgUri: this.props.route.params.imgUri})}>
                            <SvgUri
                                source={require('../../images/icons/retake.svg')}
                                style={{width: wp('7%'), height: hp('3%'), marginRight: 20, marginTop: 8}}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')}>
                            <SvgUri
                                source={require('../../images/icons/process.svg')}
                                style={{width: wp('7%'), height: hp('3%'), marginRight: 20, marginTop: 8}}/>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={[styles.imagePrev, styles.centerItems]}>
                    <ImageBackground
                        source={{uri: this.props.route.params.imgUri.uri}}
                        style={{width: wp('90%'), height: hp("70%"), marginTop: 10}} resizeMode={'contain'}/>
                </View>


                <View style={[styles.toolBar, styles.centerItems]}>
                    <Grid>
                        <Row>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => this.setState({exposureModal: true})}>
                                    <SvgUri
                                        source={require('../../images/icons/exposure.svg')}
                                        style={{width: wp('11%'), height: hp('5%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => this.setState({thresholdModal: true})}>
                                    <SvgUri
                                        source={require('../../images/icons/threshold.svg')}
                                        style={{width: wp('11%'), height: hp('5%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => this.setState({erosionModal: true})}>
                                    <SvgUri
                                        source={require('../../images/icons/erosion.svg')}
                                        style={{width: wp('11%'), height: hp('5%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => this.setState({morphModal: true})}>
                                    <SvgUri
                                        source={require('../../images/icons/morph.svg')}
                                        style={{width: wp('11%'), height: hp('5%')}}/>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => this.setState({dialationModal: true})}>
                                    <SvgUri
                                        source={require('../../images/icons/dialation.svg')}
                                        style={{width: wp('11%'), height: hp('5%')}}/>
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
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: hp('8%'),
        height: hp('10%'),
        alignItems: 'center',
    },
    modalItems: {
        flexDirection: 'row',
    }


});
export default ImagePreProcess;

