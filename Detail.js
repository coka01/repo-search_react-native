import React from 'react';
import { Text } from 'react-native';

export default ({ navigation }) =>
  <Text>{navigation.state.params.item.name}</Text>
