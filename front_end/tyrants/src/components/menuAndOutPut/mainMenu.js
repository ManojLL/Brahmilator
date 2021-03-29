import React, {Component} from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Platform,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BottomNavigator from "../navigators/BottomNavigator";

const createFormData = (photo) => {
    let i = {
        uri: photo.uri,
        type: "multipart/form-data",
        name: "image.jpg",
    };
    const data = new FormData();
    data.append('image', i)
    return data;
};


class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            letters: [],
            suggestions: [],
            find: false,
            img:[],
        };
    }

    componentDidMount() {
        this.loadAPI().then(r => console.log(r))
    }

    loadAPI = async () => {
        this.setState({isLoading: true});

        try {
            await fetch('http://192.168.8.186:5000/api/getLetters', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    "content-type": "multipart/form-data",
                },
                body: createFormData(this.props.route.params.imgUri)
            })
                .then(response => response.json())
                .then((json) => {
                    this.setState({isLoading: false});
                    console.log(json.status_code)
                    if (json.status_code === '200') {
                        this.setState({letters: json.outPut.letter, find: true})
                        console.log(this.state.letters, this.state.find)
                    } else {
                        this.setState({find: false})
                    }
                })
                .catch((error) => {
                    this.setState({isLoading: false});
                    console.log("upload error", error);
                    alert("Upload failed!");
                });
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        return (
            <View style={[styles.container]}>
                {this.state.isLoading ? (
                    <View style={[styles.centerItems]}>
                        <ActivityIndicator size="large" color="#ffffff"/>
                        <Text style={{color: "#ffffff"}}>LOADING ...</Text>
                    </View>
                ) : (

                    <View style={[styles.centerItems]}>
                        {this.state.find ? (
                            <View>
                                <View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.props.navigation.push('ResultLetter', {letters: this.state.letters,images:this.state.img})}
                                    >
                                        <Text style={{color: "#000000", fontWeight: "bold"}}>
                                            {"Translated Letters"}
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                                <View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.props.navigation.push('Result')}
                                    >
                                        <Text style={{color: "#000000", fontWeight: "bold"}}>
                                            {"Translated Words"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                <View>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.props.navigation.push('Result', {
                                            letters: 'u',
                                            suggetion: 'wwdwdwdw'
                                        })}
                                    >
                                        <Text style={{color: "#000000", fontWeight: "bold"}}>
                                            {"Translated Sentences"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View>
                                <Text style={{color: "#ffffff"}}>CAN'T TRANSLATE THE IMAGE</Text>
                            </View>
                        )}

                    </View>
                )}

                <BottomNavigator navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333",
        height: hp("100%"),
    },
    centerItems: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }, centerItems1: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
    },

    button: {
        marginTop: hp("5%"),
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: "#FFC542",
        borderRadius: 15,
    },
});

export default MainMenu;
