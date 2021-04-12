import React, {Component} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SvgUri from 'react-native-svg-uri';
import NavIcon from '../../images/icons/homeNav.svg'
import User from '../../images/icons/user.svg'
import CameraIcon from '../../images/icons/camera.svg'

class BottomNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
            }}>
                <View style={{

                    position: 'absolute',
                    alignSelf: 'center',
                    backgroundColor: '#333',
                    width: wp('18%'),
                    height: hp('9.3%'),
                    borderRadius: 35,
                    bottom: hp('5%'),
                    zIndex: 100

                }}>

                    <TouchableOpacity style={[styles.button, styles.actionBtn]}
                                      onPress={() => this.props.navigation.navigate('Camera')}>
                        <View>
                            <CameraIcon style={{
                                width: wp('8%'),
                                height: hp('4%'),
                            }}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{

                    position: 'absolute',
                    backgroundColor: '#2E2E2E',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    shadowOffset: {

                        height: 5, width: 5
                    },
                    x: 0,
                    y: 0,
                    style: {marginVertical: 5},
                    bottom: 0,
                    width: '100%',
                    height: hp('10%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 20,
                    paddingHorizontal: wp('20%')


                }}>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <View>
                                <NavIcon

                                    style={{
                                        width: wp('7%'),
                                        height: hp('4%'),
                                    }}


                                />

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity>
                            <View>
                                <User

                                    style={{
                                        width: wp('7%'),
                                        height: hp('4%'),
                                    }}

                                />
                            </View>

                        </TouchableOpacity>
                    </View>

                    {/* </View> */}
                </View>
            </View>
        );
    }


}


const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    button: {
        width: wp('15.4%'),
        height: hp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'grey',
        shadowOpacity: 0.1,
        shadowOffset: {x: 2, y: 0},
        shadowRadius: 2,
        borderRadius: 30,
        position: 'absolute',
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        zIndex: 100,

    },
    actionBtn: {

        backgroundColor: '#FFC542',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: '#333',
        zIndex: 100,

    }


});
export default BottomNavigator;
