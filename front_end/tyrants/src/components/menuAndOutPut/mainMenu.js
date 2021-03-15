import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomNavigator from '../navigators/BottomNavigator';

const createFormData = (photo) => {
    const data = new FormData();

    data.append('image', {
        uri: photo.uri,
        type: 'image/jpg',
        fileName: photo.fileName,
    });
    return data;
};

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
        console.log(this.props.route.params.imgUri);
        this.setState({isLoading: true});
        // setTimeout(() => {
        //     this.setState({isLoading: false});
        // }, 3000);// Once You Call the API Action loading will be true
        fetch(' http://localhost:5000/api/getLetters', {
            method: 'POST',
            body: createFormData(this.props.route.params.imgUri),
        })
            .then((response) => response.json())
            .then((response) => {
                this.setState({isLoading: false});
                console.log(response);
            })
            .catch((error) => {
                this.setState({isLoading: false});
                console.log('upload error', error);
                alert('Upload failed!');
            });
    };

    render() {
        return (
            <View style={[styles.container]}>
                {this.state.isLoading ? (
                    <View style={[styles.centerItems]}>
                        <ActivityIndicator size="large" color="#ffffff"/>
                        <Text style={{color: '#ffffff'}}>LOADING ...</Text>
                    </View>
                ) : (
                    <View style={[styles.centerItems]}>
                        <Text style={{color: '#ffffff'}}>MAIN MENU </Text>
                    </View>
                )}
                <BottomNavigator navigation={this.props.navigation}/>
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
