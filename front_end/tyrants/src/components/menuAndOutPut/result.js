import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView, ActivityIndicator, LogBox,

} from "react-native";
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {Dropdown} from "react-native-material-dropdown";
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
} from 'accordion-collapse-react-native';
import BottomNavigator from "../navigators/BottomNavigator";


class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLan: 'en',
            findWord: this.props.route.params.findWords,
            wordWithMeaning: this.props.route.params.withMeaning,
            ifLoading: false,
        };
    }

    componentDidMount() {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }

    translateWords = async (language) => {
        this.setState({isLoading: true});
        try {
            const data = {
                "possible_words_with_meaning": this.state.wordWithMeaning,
                'src_lan': this.state.currentLan,
                'dest_lan': language
            }
            // Changed the default IP in previous testing (Nimendra)
            await fetch('https://brahmilator-ssqj6ij3rq-as.a.run.app/api/translate', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then((json) => {
                    this.setState({isLoading: false});
                    if (json.status_code === '200') {
                        this.setState({wordWithMeaning: json.outPut.possible_words_with_meaning, currentLan: language})

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
    }

    render() {
        let data = [
            {
                label: "English",
                value: "en",
            },
            {
                label: "Spanish",
                value: "es",
            },
            {
                label: "French",
                value: "fr",
            },
            {
                label: "Russian",
                value: "ru",
            },
            {
                label: "Arabic",
                value: "ar",
            },
            {
                label: "Tamil",
                value: "ta",
            },
            {
                label: "Sinhala",
                value: "si",
            }
        ];
        return (
            <View style={styles.container}>
                {this.state.ifLoading ? (
                    <View style={[styles.centerItems]}>
                        <ActivityIndicator size="large" color="#ffffff"/>
                        <Text style={{color: "#ffffff"}}>LOADING ...</Text>
                    </View>
                ) : (
                    <View style={styles.container}>

                        <View style={[{flexDirection: "row", alignItems: "center"}]}>
                            <View style={[{flex: 1, flexDirection: "row"}]}>
                                <View style={styles.textContainer}>
                                    <Text style={styles.titleText}>Word Translations </Text>
                                </View>
                            </View>
                            <View
                                style={[
                                    {
                                        justifyContent: "space-evenly",
                                        marginVertical: 10,
                                        color: "#FFC542",
                                        width: 80,
                                    },
                                ]}
                            >
                                <Dropdown
                                    label="Select language"
                                    data={data}
                                    style={{
                                        marginTop: 4,
                                        fontWeight: "bold",
                                        fontFamily: "SF Pro Rounded",
                                        fontSize: 16,
                                        textAlign: "right",

                                    }}

                                    onChangeText={(value) => {
                                        this.translateWords(value)
                                    }}
                                />
                            </View>
                        </View>
                        {this.state.findWord.length > 0 ?
                            (
                                <ScrollView showsVerticalScrollIndicator={false} style={{padding:30}}>

                                    <View>
                                        {this.state.findWord.map((w, index) => (
                                            <View key={index}>
                                                <Collapse style={{backgroundColor: 'rgba(186, 186, 186, 0.08)',margin: 10,padding:wp("5%"), borderRadius: 15}}>
                                                    <CollapseHeader>
                                                        <View>
                                                            <Text style={styles.subtitle}>{w}</Text>
                                                        </View>
                                                    </CollapseHeader>
                                                    <CollapseBody>
                                                        <View>
                                                            {this.state.wordWithMeaning[w].map((mean, index) => (
                                                                <Text style={styles.description} key={index}>
                                                                    {mean}
                                                                </Text>
                                                            ))}

                                                        </View>
                                                    </CollapseBody>
                                                </Collapse>

                                            </View>
                                        ))}
                                        {/* Collapsible accordian to view suggested translations */}


                                        <AccordionList
                                            list={this.state.list}
                                            header={this._head}
                                            body={this._body}
                                        />
                                    </View>
                                </ScrollView>
                            ) :
                            (
                                <View style={[styles.centerItems]}>
                                    <Text
                                        style={{
                                            color: "#ffffff",
                                            justifyContent: "center",
                                            fontSize: hp('3%'),
                                        }}> NO WORDS </Text>
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
        height: "100%",

    },
    welcome: {
        flex: 1,
        margin: 20,
        backgroundColor: "orange",
        textAlign: "center",
        fontSize: 20,
        paddingTop: 70,
    },

    textContainer: {
        marginTop: 20,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingBottom: 10,
    },
    titleText: {
        fontSize: hp("4%"),
        color: "#FFC542",
        fontWeight: "bold",
        fontFamily: "SF Pro Rounded",
    },

    MainContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
    },
    button: {
        width: wp("15.4%"),
        height: hp("8%"),
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "grey",
        shadowOpacity: 0.1,
        shadowOffset: {x: 2, y: 0},
        shadowRadius: 2,
        borderRadius: 30,
        position: "absolute",
        bottom: 20,
        right: 0,
        top: 5,
        left: 5,
        zIndex: 100,
    },
    button2: {
        marginTop: hp("2%"),
        paddingLeft: 160,
        paddingRight: 160,
        width: wp("15.4%"),
        height: hp("10%"),
    },

    subtitle: {
        fontSize: hp("3.5%"),
        color: "#ffffff",
        fontWeight: "bold",
        fontFamily: "SF Pro Rounded",
    },
    description: {
        fontSize: hp("2.5%"),
        color: "#FFC542",

        fontFamily: "SF Pro Rounded",
    },

    actionBtn: {
        backgroundColor: "#FFC542",
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: "#333",
        zIndex: 100,
    },
    centerItems: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default Result;
