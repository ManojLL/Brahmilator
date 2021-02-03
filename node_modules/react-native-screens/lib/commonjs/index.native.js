"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let ENABLE_SCREENS = false;

function enableScreens(shouldEnableScreens = true) {
  ENABLE_SCREENS = shouldEnableScreens;

  if (ENABLE_SCREENS && !_reactNative.UIManager.getViewManagerConfig('RNSScreen')) {
    console.error("Screen native module hasn't been linked. Please check the react-native-screens README for more details");
  }
} // const that tells if the library should use new implementation, will be undefined for older versions


const shouldUseActivityState = true;

function screensEnabled() {
  return ENABLE_SCREENS;
} // We initialize these lazily so that importing the module doesn't throw error when not linked
// This is necessary coz libraries such as React Navigation import the library where it may not be enabled


let NativeScreenValue;
let NativeScreenContainerValue;
let NativeScreenStack;
let NativeScreenStackHeaderConfig;
let NativeScreenStackHeaderSubview;
let AnimatedNativeScreen;
const ScreensNativeModules = {
  get NativeScreen() {
    NativeScreenValue = NativeScreenValue || (0, _reactNative.requireNativeComponent)('RNSScreen', null);
    return NativeScreenValue;
  },

  get NativeScreenContainer() {
    NativeScreenContainerValue = NativeScreenContainerValue || (0, _reactNative.requireNativeComponent)('RNSScreenContainer', null);
    return NativeScreenContainerValue;
  },

  get NativeScreenStack() {
    NativeScreenStack = NativeScreenStack || (0, _reactNative.requireNativeComponent)('RNSScreenStack', null);
    return NativeScreenStack;
  },

  get NativeScreenStackHeaderConfig() {
    NativeScreenStackHeaderConfig = NativeScreenStackHeaderConfig || (0, _reactNative.requireNativeComponent)('RNSScreenStackHeaderConfig', null);
    return NativeScreenStackHeaderConfig;
  },

  get NativeScreenStackHeaderSubview() {
    NativeScreenStackHeaderSubview = NativeScreenStackHeaderSubview || (0, _reactNative.requireNativeComponent)('RNSScreenStackHeaderSubview', null);
    return NativeScreenStackHeaderSubview;
  }

};

class Screen extends _react.default.Component {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "setRef", ref => {
      this._ref = ref;
      this.props.onComponentRef && this.props.onComponentRef(ref);
    });
  }

  setNativeProps(props) {
    this._ref.setNativeProps(props);
  }

  render() {
    const {
      enabled = true
    } = this.props;

    if (!ENABLE_SCREENS || !enabled) {
      // Filter out active prop in this case because it is unused and
      // can cause problems depending on react-native version:
      // https://github.com/react-navigation/react-navigation/issues/4886

      /* eslint-disable no-unused-vars */
      const {
        active,
        enabled,
        onComponentRef,
        ...rest
      } = this.props;
      return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, _extends({}, rest, {
        ref: this.setRef
      }));
    } else {
      AnimatedNativeScreen = AnimatedNativeScreen || _reactNative.Animated.createAnimatedComponent(ScreensNativeModules.NativeScreen);
      let {
        enabled,
        active,
        activityState,
        ...rest
      } = this.props;

      if (active !== undefined && activityState === undefined) {
        console.warn('It appears that you are using old version of react-navigation library. Please update @react-navigation/bottom-tabs, @react-navigation/stack and @react-navigation/drawer to version 5.10.0 or above to take full advantage of new functionality added to react-native-screens');
        activityState = active !== 0 ? 2 : 0; // in the new version, we need one of the screens to have value of 2 after the transition
      }

      return /*#__PURE__*/_react.default.createElement(AnimatedNativeScreen, _extends({}, rest, {
        activityState: activityState,
        ref: this.setRef
      }));
    }
  }

}

class ScreenContainer extends _react.default.Component {
  render() {
    const {
      enabled = true,
      ...rest
    } = this.props;

    if (!ENABLE_SCREENS || !enabled) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, rest);
    } else {
      return /*#__PURE__*/_react.default.createElement(ScreensNativeModules.NativeScreenContainer, this.props);
    }
  }

}

const styles = _reactNative.StyleSheet.create({
  headerSubview: {
    position: 'absolute',
    top: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const ScreenStackHeaderBackButtonImage = props => /*#__PURE__*/_react.default.createElement(ScreensNativeModules.NativeScreenStackHeaderSubview, {
  type: "back",
  style: styles.headerSubview
}, /*#__PURE__*/_react.default.createElement(_reactNative.Image, _extends({
  resizeMode: "center",
  fadeDuration: 0
}, props)));

const ScreenStackHeaderRightView = props => /*#__PURE__*/_react.default.createElement(ScreensNativeModules.NativeScreenStackHeaderSubview, _extends({}, props, {
  type: "right",
  style: styles.headerSubview
}));

const ScreenStackHeaderLeftView = props => /*#__PURE__*/_react.default.createElement(ScreensNativeModules.NativeScreenStackHeaderSubview, _extends({}, props, {
  type: "left",
  style: styles.headerSubview
}));

const ScreenStackHeaderCenterView = props => /*#__PURE__*/_react.default.createElement(ScreensNativeModules.NativeScreenStackHeaderSubview, _extends({}, props, {
  type: "center",
  style: styles.headerSubview
}));

module.exports = {
  ScreenContainer,
  Screen,

  get NativeScreen() {
    return ScreensNativeModules.NativeScreen;
  },

  get NativeScreenContainer() {
    return ScreensNativeModules.NativeScreenContainer;
  },

  get ScreenStack() {
    return ScreensNativeModules.NativeScreenStack;
  },

  get ScreenStackHeaderConfig() {
    return ScreensNativeModules.NativeScreenStackHeaderConfig;
  },

  get ScreenStackHeaderSubview() {
    return ScreensNativeModules.NativeScreenStackHeaderSubview;
  },

  ScreenStackHeaderBackButtonImage,
  ScreenStackHeaderRightView,
  ScreenStackHeaderLeftView,
  ScreenStackHeaderCenterView,
  enableScreens,
  screensEnabled,
  shouldUseActivityState
};
//# sourceMappingURL=index.native.js.map