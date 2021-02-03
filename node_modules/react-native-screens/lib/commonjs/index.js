"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableScreens = enableScreens;
exports.screensEnabled = screensEnabled;
exports.shouldUseActivityState = exports.ScreenStackHeaderConfig = exports.ScreenStackHeaderCenterView = exports.ScreenStackHeaderRightView = exports.ScreenStackHeaderLeftView = exports.ScreenStackHeaderBackButtonImage = exports.ScreenStack = exports.NativeScreenContainer = exports.ScreenContainer = exports.Screen = exports.NativeScreen = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

let ENABLE_SCREENS = true;

function enableScreens(shouldEnableScreens = true) {
  ENABLE_SCREENS = shouldEnableScreens;
}

function screensEnabled() {
  return ENABLE_SCREENS;
}

class NativeScreen extends _react.default.Component {
  render() {
    let {
      active,
      activityState,
      style,
      enabled = true,
      ...rest
    } = this.props;

    if (active !== undefined && activityState === undefined) {
      activityState = active !== 0 ? 2 : 0; // change taken from index.native.js
    }

    return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
      style: [style, ENABLE_SCREENS && enabled && activityState !== 2 ? {
        display: 'none'
      } : null]
    }, rest));
  }

}

exports.NativeScreen = NativeScreen;

const Screen = _reactNative.Animated.createAnimatedComponent(NativeScreen);

exports.Screen = Screen;
const ScreenContainer = _reactNative.View;
exports.ScreenContainer = ScreenContainer;
const NativeScreenContainer = _reactNative.View;
exports.NativeScreenContainer = NativeScreenContainer;
const ScreenStack = _reactNative.View;
exports.ScreenStack = ScreenStack;
const ScreenStackHeaderBackButtonImage = _reactNative.View;
exports.ScreenStackHeaderBackButtonImage = ScreenStackHeaderBackButtonImage;
const ScreenStackHeaderLeftView = _reactNative.View;
exports.ScreenStackHeaderLeftView = ScreenStackHeaderLeftView;
const ScreenStackHeaderRightView = _reactNative.View;
exports.ScreenStackHeaderRightView = ScreenStackHeaderRightView;
const ScreenStackHeaderCenterView = _reactNative.View;
exports.ScreenStackHeaderCenterView = ScreenStackHeaderCenterView;
const ScreenStackHeaderConfig = _reactNative.View;
exports.ScreenStackHeaderConfig = ScreenStackHeaderConfig;
const shouldUseActivityState = true;
exports.shouldUseActivityState = shouldUseActivityState;
//# sourceMappingURL=index.js.map