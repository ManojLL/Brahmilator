import React, {Component} from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        setTimeout(()=>{
            this.props.navigation.replace('Home');
        },3000);
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../../images/icons/homeImge1.png')}
                    style={styles.img}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#333',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: wp('8%'),
        height: hp('5%'),
    },
});
