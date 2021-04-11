import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,

} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {Dropdown} from "react-native-material-dropdown";
import Textarea from "react-native-textarea";

import BottomNavigator from "../navigators/BottomNavigator";

class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLan: 'en',
            findWords: {}
        };
    }

    componentDidMount() {
        this.setState({findWords: this.props.route.params.findWords})
        console.log(this.state.findWords)
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

                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* Translated inscription in Sinhala  */}
                    <Textarea
                        containerStyle={styles.textareaContainer}
                        style={styles.textarea}
                        onChangeText={this.onChange}
                        defaultValue={this.state.text}
                        editable={false}
                        maxLength={1000}
                        placeholder={
                            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,"
                        }
                        placeholderTextColor={"#c7c7c7"}
                        underlineColorAndroid={"transparent"}
                    />
                    <View>
                        {

                        }

                    </View>
                </ScrollView>
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
});

export default Result;
