import React, {Component} from 'react';
import {Card} from 'react-native-shadow-cards';
import {ScrollView, StyleSheet, Text, View, LogBox,  TouchableOpacity,} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Exposer from '../../images/icons/exposure.svg';
import Threshold from '../../images/icons/threshold.svg';
import Erosion from '../../images/icons/erosion.svg';
import Morph from '../../images/icons/morph.svg';
import Dialation from '../../images/icons/dialation.svg';
import Close from '../../images/icons/close.svg';
import Opening from '../../images/icons/opening.svg';
import Closing from '../../images/icons/closing.svg';

import {Col, Row, Grid} from 'react-native-easy-grid';

LogBox.ignoreAllLogs();

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <View style={[{flex: 1, flexDirection: 'row'}]}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>Hello, Huaman!</Text>
            </View>
          </View>
          <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Pre-process', {
                  imgUri: this.state.imgUri,
                })
              }>
              <View>
                <Close
                  // source={require('../../images/icons/retake.svg')}
                  style={{
                    width: wp('7%'),
                    height: hp('3%'),
                    marginRight: 10,
                    marginTop: 3,
                  }}
                />
              </View>
            </TouchableOpacity>
        </View>
        <ScrollView>
          <Card style={styles.card}>
            <View style={{}}>
            <Grid>
              <Row>
                <Col style={[styles.alignCenter], [styles.width=25]}>
                <Threshold />
                </Col>
                <Col style={[styles.alignCenter], [styles.width=75]}>
                <Text>
                Reduces the photo to black and white; colors lighter than the
                selectable threshold are converted to white,darker colors will
                be black
              </Text>
                </Col>
              </Row>
            </Grid>
              
              
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
            <Grid>
              <Row>
                <Col style={[styles.alignCenter]}>
                <Erosion />
                </Col>
                <Col style={styles.alignCenter}>
                <Text>
                It erodes away the boundaries of foreground object. It is useful
                for removing smaill white noises detach two connected objects
              </Text>
                </Col>
              </Row>
            </Grid>
              

              
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
            <Grid>
              <Row>
                <Col style={[styles.alignCenter]}>
                <Dialation />
                </Col>
                <Col style={styles.alignCenter}>
                <Text>
                It is just opposite of erosion. It is also useful in joining
                broken parts of an object
              </Text>
                </Col>
              </Row>
            </Grid>
              

              
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
            <Grid>
              <Row>
                <Col style={[styles.alignCenter]}>
                <Opening />
                </Col>
                <Col style={styles.alignCenter}>
                  <Text>
                  It is obtained by the erosion of an image followed by a dilation. Useful for removing small objects
                (it is assumed that the objects are bright on a dark foreground)
                  </Text>
                </Col>
              </Row>
            </Grid>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
            <Grid>
              <Row>
                <Col style={[styles.alignCenter]}>
                  <Closing />
                </Col>
                <Col style={styles.alignCenter}>
                  <Text>
                    It is obtained by the dilation of an image followed by an erosion. Useful to remove small holes (dark regions)
                  </Text>
                </Col>
              </Row>
            </Grid>
              

              
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    height: '100%',
    paddingLeft: 3,
    paddingRight: 3,
  },
  text: {
    textAlign: 'justify',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 342,
    padding: 10,
    margin: 20,
    marginBottom: 2
  },
  textContainer: {
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: 10,
  },
  titleText: {
    fontSize: hp('4%'),
    color: '#FFC542',
    fontWeight: 'bold',
    fontFamily: 'SF Pro Rounded',
  },
});

export default Info;
