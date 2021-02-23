import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Button,
} from 'react-native';

class ImagePreProcess extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.toolBar,styles.centerItems]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/close.png')}
                        style={{ width: 25, height: 25,marginLeft:20  }} />
                       </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/process.png')}
                        style={{ width: 25, height: 35,marginRight:20,marginTop:8 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/retake.png')}
                        style={{ width: 30, height: 25,marginRight:20,marginTop:8 }} />
                    </TouchableOpacity>
                    </View>

                </View>
                <View style={[styles.imagePrev, styles.centerItems]}>
                    <ImageBackground
                        source={require('../../images/backgroundImages/inc.png')}
                        style={{ width: 350, height: 400, marginTop: 10 }} />
                </View>

                <View style={[styles.toolBar,styles.centerItems]}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/exposure.png')}
                        style={{ width: 48, height: 40,marginLeft:"9%" }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/threshold.png')}
                       style={{ width: 50, height: 40,marginLeft:"9%" }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/erosion.png')}
                        style={{ width: 38, height: 40,marginLeft:"9%" }} />
                    </TouchableOpacity> 
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/morph.png')}
                        style={{ width: 32, height: 40,marginLeft:"9%"}} />
                    </TouchableOpacity> 
                    <TouchableOpacity>
                    <ImageBackground
                        source={require('../../images/icons/dialation.png')}
                        style={{ width: 48, height: 40,marginLeft:"9%" }} />
                    </TouchableOpacity>   
                  
                    
                    </View>

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
    imagePrev: {
        height: '85%',
    },
    toolBar: {
        backgroundColor: '#000',
        height: '15%',
        flex: 1, flexDirection: 'row',
        padding:10,
    }


});
export default ImagePreProcess;