import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default class Getdata extends Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.movies });
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? <ActivityIndicator size="large" /> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.id},{item.title}, {item.releaseYear}</Text>
            )}
          />
        )}
      </View>
    );
  }
};