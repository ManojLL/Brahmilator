import {Platform} from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  ios: `${RNFS.DocumentDirectoryPath}/BrahmiImages`,
  android: `${RNFS.ExternalStorageDirectoryPath}/BrahmiImages`,
});

export const dirPicutures = `${dirHome}/Pictures`;
