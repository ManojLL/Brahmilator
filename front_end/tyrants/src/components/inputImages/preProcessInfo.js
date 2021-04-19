import React, { Component } from "react";
import { Card } from "react-native-shadow-cards";
import {
 
  ScrollView,
  StyleSheet,
  Text,
  View,
  LogBox,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Exposer from "../../images/icons/exposure.svg";
import Threshold from "../../images/icons/threshold.svg";
import Erosion from "../../images/icons/erosion.svg";
import Morph from "../../images/icons/morph.svg";
import Dialation from "../../images/icons/dialation.svg";
import Retake from "../../images/icons/retake.svg";
LogBox.ignoreAllLogs();

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <View style={[{ flex: 1, flexDirection: "row" }]}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Hello, Huaman!</Text>
            </View>
          </View>
          <View>
            <Retake
              style={{ width: wp("7%"), height: hp("2%"), marginLeft: 10 }}
            />
          </View>
        </View>
        <ScrollView>
          <Card style={styles.card}>
            <View style={{}}>
              <View>
                <Exposer />
              </View>

              <Text>
                Exposure is the overall brightness or darkness of the
                photograph. You can digitally change its value and make the
                picture darker or lighter.
              </Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
              <Threshold />
              <Text>
                Reduces the photo to black and white; colors lighter than the
                selectable threshold are converted to white,darker colors will
                be black.
              </Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
              <Erosion />

              <Text>
                It erodes away the boundaries of foreground object. It is useful
                for removing smaill white noises detach two connected objects.
              </Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
              <Dialation />

              <Text>
                It is just opposite of erosion. It is also useful in joining
                broken parts of an object.
              </Text>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
              <Morph />

              <Text>
                It is just opposite of erosion. It is also useful in joining
                broken parts of an object.
              </Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#333",
    height: "100%",
    paddingLeft: 3,
    paddingRight: 3,
  },
  text: {
    textAlign: "justify",
  },
  card: {
    backgroundColor: "#ACACAC",
    width: 342,
    padding: 10,
    margin: 12,
    marginLeft: 0,
    marginRight: 0,
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
});

export default Info;
