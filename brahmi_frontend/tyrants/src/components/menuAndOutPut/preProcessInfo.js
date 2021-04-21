import React, {Component} from 'react';
import {Card} from 'react-native-shadow-cards';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  LogBox,
  TouchableOpacity,
} from 'react-native';
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
              <Text style={styles.titleText}>Read before use!</Text>
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
                  marginRight: 25,
                  marginTop: 14,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Card style={styles.card}>
            <View style={{}}>
              <Grid>
              <Row style={styles.rowStyle}>
                  <Col style={styles.colStyle}>
                    <Threshold />
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text>
                      Reduces the photo to black and white; colors lighter than
                      the selectable threshold are converted to white,darker
                      colors will be black
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
              <Grid>
              <Row style={styles.rowStyle}>
                  <Col style={styles.colStyle}>
                    <Erosion />
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text>
                      It erodes away the boundaries of foreground object. It is
                      useful for removing smaill white noises detach two
                      connected objects
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </View>
          </Card>

          <Card style={styles.card}>
            <View>
              <Grid>
              <Row style={styles.rowStyle}>
                  <Col style={styles.colStyle}>
                    <Dialation />
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text>
                      It is just opposite of erosion. It is also useful in
                      joining broken parts of an object
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
              <Grid>
                <Row style={styles.rowStyle}>
                  <Col style={styles.colStyle}>
                    <Opening />
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text>
                      It is obtained by the erosion of an image followed by a
                      dilation. Useful for removing small objects (it is assumed
                      that the objects are bright on a dark foreground)
                    </Text>
                  </Col>
                </Row>
              </Grid>
            </View>
          </Card>

          <Card style={styles.card}>
            <View style={{}}>
              <Grid>
                <Row style={styles.rowStyle}>
                  <Col style={styles.colStyle}>
                    <Closing />
                  </Col>
                  <Col style={{justifyContent: 'center'}}>
                    <Text>
                      It is obtained by the dilation of an image followed by an
                      erosion. Useful to remove small holes (dark regions)
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
  rowStyle: {height: hp('15%'), marginRight: wp('5%')},
  colStyle: {
    width: wp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#333',
    height: '100%',
    paddingLeft: 3,
    paddingRight: 3,
  },
  text: {
    color: '#ffffff',
    textAlign: 'justify',
  },
  card: {
    // backgroundColor: 'rgba(186, 186, 186, 0.08)',
    backgroundColor: 'rgba(186, 186, 186, 0.5)',
    width: 342,
    padding: 10,
    marginLeft: 20,
    marginBottom: 20,
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
    marginLeft: wp('5%'),
  },
});

export default Info;
