import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    LogBox,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
//import SearchableDropdown from "react-native-searchable-dropdown";
import { Dropdown } from "react-native-material-dropdown";
import Textarea from "react-native-textarea";
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
    AccordionList,
} from "accordion-collapse-react-native";
import SvgUri from 'react-native-svg-uri';

LogBox.ignoreAllLogs();
class Result extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                <View style={[{ flexDirection: "row", alignItems: "center" }]}>
                    <View style={[{ flex: 1, flexDirection: "row" }]}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titleText}> Translation</Text>
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
                    <View style={styles.textContainer}>
                        <Text style={styles.titleText}> Suggestions</Text>
                    </View>

                    <View>
                        {/* Collapsible accordian to view suggested translations */}
                        <Collapse>
                            <CollapseHeader>
                                <View>
                                    <Text style={styles.subtitle}> Suggested Translation 01</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <Text style={styles.description}>
                                     Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                    natoque penatibus et magnis dis parturient montes, nascetur
                                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                                    eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                                    pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                                    In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                                    justo. Nullam dictum felis eu pede mollis pretium. Integer
                                    tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                                    vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                                    consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                                    dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                                    nulla ut metus varius laoreet. Quisque rutrum. Aenean
                                    imperdiet. Etiam ultricies nisi vel augue. Curabitur
                                    ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
                                    Maecenas tempus, tellus eget condimentum rhoncus, sem quam
                                    semper libero, sit amet adipiscing sem neque sed ipsum. Nam
                                    quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                                    Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                                    ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet
                                    orci eget eros faucibus tincidunt. Duis leo. Sed fringilla
                                    mauris sit amet nibh. Donec sodales sagittis magna. Sed
                                    consequat, leo eget bibendum sodales, augue velit cursus nunc,
                                </Text>
                            </CollapseBody>
                        </Collapse>

                        <Collapse>
                            <CollapseHeader>
                                <View>
                                    <Text style={styles.subtitle}> Suggested Translation 02</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <Text style={styles.description}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                    natoque penatibus et magnis dis parturient montes, nascetur
                                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                                    eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                                    pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                                    In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                                    justo. Nullam dictum felis eu pede mollis pretium. Integer
                                    tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                                    vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                                    consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                                    dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                                    nulla ut metus varius laoreet. Quisque rutrum. Aenean
                                    imperdiet. Etiam ultricies nisi vel augue. Curabitur
                                    ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
                                    Maecenas tempus, tellus eget condimentum rhoncus, sem quam
                                    semper libero, sit amet adipiscing sem neque sed ipsum. Nam
                                    quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                                    Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                                    ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet
                                    orci eget eros faucibus tincidunt. Duis leo. Sed fringilla
                                    mauris sit amet nibh. Donec sodales sagittis magna. Sed
                                    consequat, leo eget bibendum sodales, augue velit cursus nunc,
                                </Text>
                            </CollapseBody>
                        </Collapse>

                        <Collapse>
                            <CollapseHeader>
                                <View>
                                    <Text style={styles.subtitle}> Suggested Translation 03</Text>
                                </View>
                            </CollapseHeader>
                            <CollapseBody>
                                <Text style={styles.description}>
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                                    natoque penatibus et magnis dis parturient montes, nascetur
                                    ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                                    eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                                    pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                                    In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                                    justo. Nullam dictum felis eu pede mollis pretium. Integer
                                    tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                                    vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                                    consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                                    dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                                    nulla ut metus varius laoreet. Quisque rutrum. Aenean
                                    imperdiet. Etiam ultricies nisi vel augue. Curabitur
                                    ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus.
                                    Maecenas tempus, tellus eget condimentum rhoncus, sem quam
                                    semper libero, sit amet adipiscing sem neque sed ipsum. Nam
                                    quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem.
                                    Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien
                                    ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet
                                    orci eget eros faucibus tincidunt. Duis leo. Sed fringilla
                                    mauris sit amet nibh. Donec sodales sagittis magna. Sed
                                    consequat, leo eget bibendum sodales, augue velit cursus nunc,
                                </Text>
                            </CollapseBody>
                        </Collapse>

                        <AccordionList
                            list={this.state.list}
                            header={this._head}
                            body={this._body}
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.button2]}
                        onPress={() => this.props.navigation.navigate("")}
                    >
                        <SvgUri
                            style={{
                                width: wp("10%"),
                                height: hp("11%"),
                                paddingLeft:35,
                                paddingTop:45,
                            }}
                            resizeMode="contain"
                            source={require("../../images/icons/save1.svg")}
                        />
                    </TouchableOpacity>
                </ScrollView>
                {/* Bottom Navigation Bar */}
                <View style={{
                flexDirection: 'column',
            }}>
                <View style={{

                    position: 'absolute',
                    alignSelf: 'center',
                    backgroundColor: '#333',
                    width: wp('18%'),
                    height: hp('9.3%'),
                    borderRadius: 35,
                    bottom: hp('5%'),
                    zIndex: 100

                }}>

                    <TouchableOpacity style={[styles.button, styles.actionBtn]} onPress={() => this.props.navigation.navigate('Camera')}>

                        <SvgUri style={{
                            width: wp('8%'),
                            height: hp('4%'),
                        }}
                            resizeMode="contain"
                            source={require('../../images/icons/camera.svg')} />
                    </TouchableOpacity>
                </View>
                <View style={{

                    position: 'absolute',
                    backgroundColor: '#2E2E2E',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    shadowOffset: {

                        height: 5, width: 5
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: hp('10%'),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 20,
                    paddingHorizontal: wp('20%')


                }}>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                            <SvgUri

                                style={{
                                    width: wp('7%'),
                                    height: hp('4%'),
                                }}

                                source={require('../../images/icons/homeNav.svg')}

                            />



                        </TouchableOpacity>
                    </View>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity>
                            <SvgUri

                                style={{
                                    width: wp('7%'),
                                    height: hp('4%'),
                                }}

                                source={require('../../images/icons/user.svg')} />



                        </TouchableOpacity>
                    </View>

                    {/* </View> */}
                </View>
            </View>
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
        shadowOffset: { x: 2, y: 0 },
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
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        borderWidth: 2,
        borderColor: "#333",
        zIndex: 100,
    },
});

export default Result;
