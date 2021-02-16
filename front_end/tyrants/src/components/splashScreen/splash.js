import React, {Component} from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';

export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        setTimeout(()=>{
            this.props.navigation.replace('Home');
        },4000);
    }
    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: '100%',
    },
});
