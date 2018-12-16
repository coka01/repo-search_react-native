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
    refreshing: false,
  }
  page = 0;

  // WebAPIを叩く処理. fetchAPIを使用する
  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1;

    this.setState({ refreshing });
    fetch('https://api.github.com/search/repositories?q=react&page=${newPage}')
      // 扱いやすいようにjson形式で受け取る. fetchAPIでは基本形.
      .then(response => response.json())
      .then(({ items }) => {
        this.page = newPage;
        if (refreshing) {
          // 更新中の場合はUI上は変えない.
          // refreshingをfalseにして更新中インジケーターを非表示にする
          this.setState({ items, refreshing: false });
        } else {
          // 前回表示していたItemListと合成したリストを生成
          this.setState({ items: [...this.state.items, ...items],
            refreshing: false })
        }
      });
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
          onEndReached={() => this.fetchRepositories()}
          // 引っ張って更新するようにする
          onRefresh={() => this.fetchRepositories(true)}
          // 更新中かどうかをstateで管理
          refreshing={this.state.refreshing}/>
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
