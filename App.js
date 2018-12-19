/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from './Home';
import Detail from './Detail'

export default createAppContainer (
  createStackNavigator({
    // ホーム画面のキー
    Home: {
      // ホーム画面のクラス
      screen: Home,
      // ヘッダーにタイトルを設定
      navigationOptions: {
        title: 'Home',
      },
    },
    // 詳細画面のキー
    Detail: {
      // 詳細画面のクラス
      screen: Detail,
      // ヘッダーにタイトルを設定
      navigationOptions: ({ navigation }) => ({
        title: navigation.state.params.item.name,
      }),
    },
  },{
    // 初期画面の設定
    initialRouteView: 'Home',
  }));
