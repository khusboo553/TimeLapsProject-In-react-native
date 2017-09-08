import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TabBarIOS,
} from 'react-native';
import RecordClass from './Records.js';
import TimerClass from './Timer.js';

export default class HomeClass extends Component {
  constructor(){
    super();
    this.state={
      selectedTab:"TimerClass"
    }
  }
  render() {
    return (
        <TabBarIOS selectedTab={this.state.selectedTab}>
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'TimerClass'}
              title="Timer"
              // icon={{require('TimeLapsProject/AssetFile/menu1.png'),scale: 2}}
              // icon={{uri: 'TimeLapsProject/AssetFile/menu1.png', scale: 2}}
              onPress={() => {
                  this.setState({
                      selectedTab: 'TimerClass',
                  });
              }}>
                <TimerClass/>
            </TabBarIOS.Item>
            <TabBarIOS.Item
              selected={this.state.selectedTab === 'RecordClass'}
              title="Records"
              // icon={require('TimeLapsProject/AssetFile/stopWatch.png')}
              onPress={() => {
                    this.setState({
                        selectedTab: 'RecordClass',
                    });
              }}>
              <RecordClass/>
            </TabBarIOS.Item>
          </TabBarIOS>
    );
  }
}
