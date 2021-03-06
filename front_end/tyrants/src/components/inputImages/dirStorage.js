import {Platform} from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  android: `${RNFS.DocumentDirectoryPath}/tyrents`,
  iso: `${RNFS.ExternalStorageDirectoryPath}/tyrents`,
});

export const dirPicutures = `${dirHome}/images`;
