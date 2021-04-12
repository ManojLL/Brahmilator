import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView, ActivityIndicator,

} from "react-native";
import {Col, Row, Grid} from 'react-native-easy-grid';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {Dropdown} from "react-native-material-dropdown";

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


    render() {
        let data = [
            {
                label: "English",
                value: "English",
            },
            {
                label: "Spanish",
                value: "Spanish",
            },
            {
                label: "French",
                value: "French",
            },
            {
                label: "Russian",
                value: "Russian",
            },
            {
                label: "Arabic",
                value: "Arabic",
            },
            {
                label: "Tamil",
                value: "Tamil",
            },
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
                                        this.setState({currentLan: value})
                                    }}
                                />
                            </View>
                        </View>
                        {this.state.findWord.length > 0 ?
                            (
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Row>
                                        <Col>
                                            <View>
                                                <Text
                                                    style={{
                                                        color: "#FFC542",
                                                        marginLeft: 20,
                                                        fontSize: hp('2.5%'),
                                                    }}>WORD</Text>
                                            </View>
                                        </Col>
                                        <Col>
                                            <View>
                                                <Text
                                                    style={{
                                                        color: "#FFC542",
                                                        marginLeft: 20,
                                                        fontSize: hp('2.5%'),
                                                    }}>MEANING</Text>
                                            </View>
                                        </Col>
                                    </Row>
                                    <View style={{padding: 20}}>
                                        <Grid>
                                            {this.state.findWord.map((w, index) => (
                                                <Row style={{
                                                    borderWidth: 1,
                                                    borderColor: '#ffffff',
                                                    marginBottom: 10,
                                                    padding: 10
                                                }}>
                                                    <Col>
                                                        <View key={index}>
                                                            <Text
                                                                style={{
                                                                    color: "#ffffff",
                                                                    marginLeft: 20,
                                                                    fontSize: hp('3%'),
                                                                }}>{w}</Text>
                                                        </View>
                                                    </Col>
                                                    <Col>
                                                        <View>
                                                            {this.state.wordWithMeaning[w].map((mean, index) => (
                                                                <View>
                                                                    <Text
                                                                        style={{
                                                                            color: "#ffffff",
                                                                            marginLeft: 20,
                                                                            fontSize: hp('3%'),
                                                                        }} key={index}>{mean}</Text>
                                                                </View>
                                                            ))

                                                            }
                                                        </View>
                                                    </Col>
                                                </Row>
                                            ))

                                            }
                                        </Grid>

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
        fontSize: hp("2%"),
        color: "#FFC542",
        fontWeight: "bold",
        fontFamily: "SF Pro Rounded",
    },
    description: {
        fontSize: hp("2%"),
        color: "#FFFFFF",

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
