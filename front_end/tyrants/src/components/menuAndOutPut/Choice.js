import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class Choice extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>



                <View style={[styles.centerItems]}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('')}>
                        <Text style={{ color: '#000000', fontSize: hp('2%'), fontWeight: 'bold' }}>{'Translated Letters'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.centerItems]}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('')}>
                        <Text style={{ color: '#000000', fontSize: hp('2%'), fontWeight: 'bold' }}>{'Translated Words'}</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.centerItems]}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.push('')}>
                        <Text style={{ color: '#000000', fontSize: hp('2%'), fontWeight: 'bold' }}>{'Translated Sentences'}</Text>
                    </TouchableOpacity>
                </View>


                <View style={[styles.centerItems]}>
                    <ImageBackground
                        source={require('../../images/backgroundImages/userImage.png')}

                        style={{ width: wp('90%'), height: hp('50%'), marginTop: 0, marginLeft: 50 }} />

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
    img: {
        width: wp('9%'),
        height: hp('5%'),
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
export default Choice;