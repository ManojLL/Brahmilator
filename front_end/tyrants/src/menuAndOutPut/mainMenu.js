import React, {Component} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentDidMount() {

        this.loadAPI();
    }

    loadAPI = () => {
        setTimeout(() => {
            this.setState({isLoading: false});
        }, 3000);// Once You Call the API Action loading will be true
    };


    render() {
        return (
            <View style={[styles.container]}>
                {this.state.isLoading ?
                    <View style={[styles.centerItems]}>
                        <ActivityIndicator size="large" color='#ffffff'/>
                        <Text style={{color: '#ffffff'}}>LOADING ...</Text>
                    </View>
                    :
                    <View style={[styles.centerItems]}>
                        <Text style={{color: '#ffffff'}}>MAIN MENU </Text>

                    </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333',
        height: hp('100%'),
    },
    centerItems: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default MainMenu;