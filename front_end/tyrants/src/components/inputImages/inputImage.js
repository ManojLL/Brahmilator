import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
} from 'react-native';
import { RNCamera } from 'react-native-camera'

class InputImg extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    style={{ flex: 1, alignItems: 'center' }}
                    ref={ref => {
                        this.camera = ref
                    }}
                />
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



});
export default InputImg;
