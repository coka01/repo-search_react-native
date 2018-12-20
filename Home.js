/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,
  TouchableOpacity, FlatList, TextInput, Image, AppState} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  state = {
    items: [],
    refreshing: false,
    text: '',
  }
  page = 0;

  // WebAPIを叩く処理. fetchAPIを使用する
  fetchRepositories(refreshing = false) {
    const newPage = refreshing ? 1 : this.page + 1;

    this.setState({ refreshing });
    fetch('https://api.github.com/search/repositories?q=' + this.state.text + '&page= ' + newPage)
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

  navigateToDetail(item) {
    // 画面遷移処理. itemを渡してDetail側で受け取る
    this.props.navigation.navigate('Detail', { item })
  }

  // AppStateのライフサイクル
  componentDidMount() {
     AppState.addEventListener('change', this.onChangeState);
  }

  // AppStateのライフサイクル
  componentWillUnmount() {
    AppState.removeEventListener('change', this.onChangeState);
  }

  // アロー関数でthisに束縛する手間を省く
  onChangeState = (appState) =>  {
    console.log(appState);
    // appState: active/inactive/background
    if (appState === 'active') {
      // バックグラウンドから復帰したときにテキストボックスに入っているワードで検索をかける
      this.fetchRepositories(true);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ text })} />
          <TouchableOpacity
            onPress={() => this.fetchRepositories(true)}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          // apiから取得したitemsをdataとする
          data={this.state.items}
          // 各項目の名前をテキストで出力する
          renderItem={({ item }) =>
            <TouchableOpacity
              style={{padding: 10}}
              onPress={() => this.navigateToDetail(item)}>
              <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
                {item.name}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Image style={styles.ownerIcon} source={{ uri: item.owner.avatar_url }}/>
                <Text style={styles.ownerName}>{item.owner.login}</Text>
              </View>
            </TouchableOpacity>
          }
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
  inputWrapper: {
    padding: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#EEE',
    borderRadius: 4,
  },
  searchText: {
    padding: 10,
  },
  ownerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 5,
  },
  ownerName: {
    fontSize: 14
  },
});
