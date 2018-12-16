/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  // WebAPIを叩く処理. fetchAPIを使用する
  onPressFetch() {
    fetch('https://api.github.com/search/repositories?q=react')
      // 扱いやすいようにjson形式で受け取る. fetchAPIでは基本形.
      .then(response => response.json())
      .then(response => console.log(response));
      // 'items'だけを取得したい場合は以下のように処理する
      // .then({items}) => console.log(items));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.onPressFetch()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5ECEE',
  },
});
