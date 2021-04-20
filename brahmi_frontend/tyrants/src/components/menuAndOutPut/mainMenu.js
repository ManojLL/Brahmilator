/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomNavigator from '../navigators/BottomNavigator';
import NetInfo from '@react-native-community/netinfo';

const createFormData = (photo) => {
  let i = {
    uri: photo.uri,
    type: 'multipart/form-data',
    name: 'image.jpg',
  };
  const data = new FormData();
  data.append('image', i);
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
      img: [],
      connection: true,
      errorMessage: '',
      words: [],
      wordsWithM: {},
    };
  }

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        this.loadAPI();
      } else {
        alert('Can not connected to the Server, Please Try Again!');
        this.setState({connection: false});
        this.props.navigation.navigate('Pre-process', {
          imgUri: this.props.route.params.imgUri,
        });
      }
    });
  }

  loadAPI = async () => {
    this.setState({isLoading: true});
    const data = {image: this.props.route.params.imgUri};
    try {
      await fetch(
        'https://brahmilator-ssqj6ij3rq-as.a.run.app/api/getLetters',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({isLoading: false});
          if (json.status_code === '200') {
            if (json.outPut.letter.length > 0) {
              this.setState({
                letters: json.outPut.letter,
                img: json.outPut.images,
                find: true,
              });
            } else {
              this.setState({
                letters: json.outPut.letter,
                img: json.outPut.images,
                find: false,
              });
            }
          } else {
            this.setState({find: false, errorMessage: json.outPut});
          }
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log('upload error', error);
          alert('Upload Failed!');
        });
    } catch (error) {
      console.error(error);
    }
  };

  getWord = async () => {
    const data = {letters: this.state.letters};
    try {
      this.setState({isLoading: true});
      // Changed the default IP in previous testing (Nimendra)
      await fetch(
        'https://brahmilator-ssqj6ij3rq-as.a.run.app/api/getPossibleWords',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
        .then((response) => response.json())
        .then((json) => {
          this.setState({isLoading: false});
          if (json.status_code === '200') {
            this.setState({
              words: json.outPut.possible_words,
              wordsWithM: json.outPut.possible_words_with_meaning,
            });
            this.props.navigation.push('Result', {
              findWords: this.state.words,
              withMeaning: this.state.wordsWithM,
            });
          } else {
            this.props.navigation.push('Result', {
              findWords: this.state.words,
              withMeaning: this.state.wordsWithM,
            });
          }
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log('upload error', error);
          alert('Upload Failed!');
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
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={{color: '#ffffff', marginLeft: 8, marginTop: 5}}>
              Processing..
            </Text>
          </View>
        ) : (
          <View style={[styles.centerItems]}>
            {this.state.find ? (
              <View>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                      this.props.navigation.push('ResultLetter', {
                        letters: this.state.letters,
                        images: this.state.img,
                      })
                    }>
                    <Text style={{color: '#000000', fontWeight: 'bold'}}>
                      {'Translated Letters'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.getWord()}>
                    <Text style={{color: '#000000', fontWeight: 'bold'}}>
                      {'Translated Words'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text style={{color: '#ffffff'}}>
                  Image Did Not Properly Pre - Processed!
                </Text>
              </View>
            )}
          </View>
        )}

        <BottomNavigator navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    height: "100%",
  },
  centerItems: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerItems1: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: "center",
  },

  button: {
    marginTop: hp('5%'),
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 60,
    paddingRight: 60,
    backgroundColor: '#FFC542',
    borderRadius: 15,
  },
});

export default MainMenu;
