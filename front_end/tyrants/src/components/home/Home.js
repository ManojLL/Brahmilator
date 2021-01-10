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
                    <Text>Welcome to</Text>
                    <View>
                        <Text><Text>Brahimilator , </Text><Text> mobile </Text></Text>

                    </View>
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,

    },

});
export default Home;
