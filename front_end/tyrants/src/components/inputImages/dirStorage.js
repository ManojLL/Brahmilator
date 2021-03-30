import { Platform } from 'react-native';
const RNFS = require('react-native-fs');

export const dirHome = Platform.select({
  android: `${RNFS.DocumentDirectoryPath}/tyrants`,
  ios: `${RNFS.ExternalStorageDirectoryPath}/tyrants`,
});

export const dirPicutures = `${dirHome}/images`;
