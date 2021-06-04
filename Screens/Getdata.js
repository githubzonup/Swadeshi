import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {View, Text, StyleSheet} from 'react-native';
class Getdata extends Component {
  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };
  watchID: ?number = null;
  componentDidMount = () => {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        console.log('details: ', initialPosition);
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  };
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.boldText}>Initial position:</Text>

        <Text>{this.state.initialPosition}</Text>

        <Text style={styles.boldText}>Current position:</Text>

        <Text>{this.state.lastPosition}</Text>
      </View>
    );
  }
}
export default Getdata;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  boldText: {
    fontSize: 30,
    color: 'red',
  },
});
