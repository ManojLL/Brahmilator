import React, {Component} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.imageBg}>
                    <ImageBackground
                        source={require('../../images/icons/homeImge1.png')}
                        style={styles.img}/>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Welcome to</Text>
                    <View>
                        <Text><Text style={styles.specText}>Brahimilator , </Text><Text
                            style={styles.text}> mobile </Text></Text>

                    </View>
                </View>
                <View style={styles.subTitle}>
                    <Text>Real time brahmi translator</Text>
                    <Text>at your service</Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        height: '100%',
    },
    imageBg: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 105,
        height: 120,
    },
    textContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
    },
    text: {
        fontSize: 24,
        color: '#ffffff',
    },
    specText: {
        fontSize: 24,
        color: '#FFC542',
    },
    subTitle: {
        marginTop:20,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default Home;
