import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View , ImageBackground } from 'react-native';
import Geocoder from "react-native-geocoding";
import Geolocation from "@react-native-community/geolocation"

export default class getcurrentadd extends Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      address: '',
      tempAddress: '',
    };
  }

  async componentDidMount() {

    Geolocation.getCurrentPosition(info => {
      console.log('Check Geolocation: ==> ', info);
      this.setState({
        lat: info.coords.latitude,
        long: info.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
      alert(this.state.lat, this.state.lng)
      Geocoder.init('AIzaSyAD8xu1x0JifTQ0xeU_vIT0g67wqCtdZNA');
      Geocoder.from(info.coords.latitude, info.coords.longitude)
          .then(json => {
                console.log("Address: ",json)
              json.results[0].address_components.forEach((value, index) =>{
                this.setState({ address: json.results[0].formatted_address,
                   tempAddress: json.results[0].formatted_address  })
                  
              })
          })
    })

  }



  render() {
 return (
      <View>
        <Text>Hiiii</Text>
      </View>
      
    )
 }
  }