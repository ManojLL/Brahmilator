import React, {Component} from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    LogBox,
    TouchableOpacity, ImageBackground,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//import SearchableDropdown from "react-native-searchable-dropdown";
import {Dropdown} from "react-native-material-dropdown";
import Textarea from "react-native-textarea";
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
} from "accordion-collapse-react-native";
import BottomNavigator from "../navigators/BottomNavigator";
LogBox.ignoreAllLogs();
class ResultLetter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letters: [],
            img: []
        };
    }

    componentDidMount() {
        this.setState({letters: this.props.route.params.letters, img: this.props.route.params.images})
    }

    render() {
        //native languages list
        let data = [
            {
                value: "English",
            },
            {
                value: "Spanish",
            },
            {
                value: "French",
            },
            {
                value: "Russian",
            },
            {
                value: "Arabic",
            },
            {
                value: "Tamil",
            },
        ];
        return (
            <View>
                <View style={styles.container}>
                    <View style={[{flexDirection: "row", alignItems: "center"}]}>
                        <View style={[{flex: 1, flexDirection: "row"}]}>
                            <View style={styles.textContainer}>
                                <Text style={styles.titleText}> Translated letters</Text>
                            </View>
                        </View>
                        <View
                            style={[
                                {
                                    justifyContent: "space-evenly",
                                    marginVertical: 10,
                                    color: "#FFC542",
                                    width:80,
                                },
                            ]}
                        >
                            <Dropdown
                                label="Select"
                                data={data}
                                style={{
                                    marginTop: 4,
                                    fontWeight: "bold",
                                    fontFamily: "SF Pro Rounded",
                                    fontSize: 16,
                                    textAlign: "right",

                                }}
                            />
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom: hp('7%')}}>
                        {this.state.letters.map((letter,index) => (
                            <View style={{flex: 1, flexDirection: 'row',}} key={index}>
                                <ImageBackground
                                    source={{uri:`data:image/png;base64,${this.state.img[index]}`}}
                                    style={{width: wp('35%'), height: hp('20%'), marginLeft: 20,marginBottom:20}}/>
                                <View style={{justifyContent: "center"}}>
                                    <Text
                                        style={{color: "#ffffff", marginLeft: 20, fontSize: hp('3%'),}}>{letter}</Text>
                                </View>

                            </View>
                        ))}


                    </ScrollView>
                    <BottomNavigator navigation={this.props.navigation}/>
                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#333",
        height: "100%",
        // paddingLeft: 5,
        // paddingRight: 5,
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
});

export default ResultLetter;
