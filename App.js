/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,
  TouchableOpacity, FlatList} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  state = {
    items: [],
  }
  page = 0;

  // WebAPIを叩く処理. fetchAPIを使用する
  fetchRepositories() {
    const newPage = this.page + 1;
    fetch('https://api.github.com/search/repositories?q=react&page=${newPage}')
      // 扱いやすいようにjson形式で受け取る. fetchAPIでは基本形.
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;
        // 前回表示していたItemListと合成したリストを生成
        this.setState({ items: [...this.state.items, ...items] })});
      // レスポンス全体を取得したい場合は以下のように処理する
      // .then(response => console.log(response));
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{marginTop: 60}}
          onPress={() => this.fetchRepositories()}>
          <Text>Fetch</Text>
        </TouchableOpacity>
        <FlatList
          // apiから取得したitemsをdataとする
          data={this.state.items}
          // 各項目の名前をテキストで出力する
          renderItem={({ item }) => <Text style={{padding: 20}}>{item.name}</Text>}
          // keyが存在していない場合にはitemIDを設定する
          keyExtractor={(item) => item.id}
          // リストの最下部に到達した場合の処理
          onEndReached={() => this.fetchRepositories()}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5ECEE',
  },
});
