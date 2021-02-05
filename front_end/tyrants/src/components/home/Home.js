import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
} from 'react-native';

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
                    <Text style={styles.text}>Welcome to</Text>
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
                    <ImageBackground
                        source={require('../../images/backgroundImages/homeImg.png')}

                        style={{width: 330, height: 300, marginTop: 40}}/>
                </View>

                <View style={[styles.centerItems]}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color:'#000000'}}>{'Get started'}</Text>
                    </TouchableOpacity>
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
        width: "38%",
        height: 64,    
        marginLeft:"22%"
        
        
    },
    textContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 24,
    },
    text: {
        fontSize: 30,
        color: '#fff',
        fontWeight: 'bold',
    },
    specText: {
        fontSize: 30,
        color: '#FFC542',
        fontWeight: 'bold',
    },
    subTitle: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 40,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: '#FFC542',
        borderRadius:15,
    },


});
export default Home;
