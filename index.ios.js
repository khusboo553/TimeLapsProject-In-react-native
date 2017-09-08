/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import HomeClass from './TimeStampFolder/HomePage.js';

export default class TimeLapsProject extends Component {
  render() {
    return (
      <HomeClass/>
    );
  }
}

AppRegistry.registerComponent('TimeLapsProject', () => TimeLapsProject);
