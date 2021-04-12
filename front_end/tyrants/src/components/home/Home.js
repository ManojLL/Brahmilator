import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SvgUri from 'react-native-svg-uri';
import HomePic from '../../images/backgroundImages/homeImg.svg'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center', marginTop: 8,
                }}>
                    <ImageBackground
                        source={require('../../images/icons/homeImge1.png')}
                        style={styles.img}/>

                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Welcome to </Text>
                    <View>
                        <Text><Text style={styles.specText}>Brahimilator ,</Text><Text
                            style={styles.text}> mobile </Text></Text>

                    </View>
                </View>
                <View style={styles.subTitle}>
                    <Text>Real time brahmi translator</Text>
                    <Text>at your service</Text>
                </View>
                <View style={styles.centerItems}>
                    <HomePic
                        // source={require('../../images/backgroundImages/homeImg.svg')}

                        style={{width: wp('80%'), height: hp('40%'), marginTop: 40}}/>
                </View>

                <View style={[styles.centerItems]}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('Camera')}>
                        <Text style={{color: '#000000'}}>{'Get started'}</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%'
    },
    centerItems: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: wp('8%'),
        height: hp('5%'),
    },
    textContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: hp('4%'),
        color: '#fff',
        fontWeight: 'bold',
    },
    specText: {
        fontSize: hp('4%'),
        color: '#FFC542',
        fontWeight: 'bold',
    },
    subTitle: {
        marginTop: hp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: hp('10%'),
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: '#FFC542',
        borderRadius: 15,
    },


});
export default Home;
