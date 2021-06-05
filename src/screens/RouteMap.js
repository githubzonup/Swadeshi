import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
export default class RouteMap extends React.Component {
  static navigationOptions = {
    title: 'Route Map',
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      User_id: this.props.navigation.state.params.id,
      reports: [],
      polylineMap: [],
      lat: '',
      long: '',
      Latitude: '',
      Longitude: '',
    };
  }

  //---------------------------------------------------------------------------------------------------//

  // componentDidMount() {

  //   this.apiCall();
  // }
  //   async apiCall() {

  //     let resp = await fetch('https://skillpundit.com/api/routes.php')
  //     let respJson = await resp.json()
  //      console.log(respJson);
  //      let polylineMap = [];
  //      respJson.reports.map((value,key)=> {

  //        polylineMap.push({ latitude: value.Latitude, longitude: value.Longitude });
  //      });
  //     // console.warn( respJson)
  //      this.setState({
  //      //  data:respJson.visit
  //        reports: respJson.reports,
  //        polylineMap:polylineMap
  //       })
  //       console.log(this.state.polylineMap);
  //   }
  //---------------------------------------------------------------------------------------------------//
  componentDidMount() {
    Geolocation.getCurrentPosition(info => {
      console.log('Check Geolocation: ==> ', info);
      this.setState({
        lat: info.coords.latitude,
        long: info.coords.longitude,
        // Latitude: info.coords.latitude,
        // Longitude: info.coords.longitude,
        Latitude: info.coords.latitude,
        Longitude: info.coords.longitude,
      });
      console.log('Latitude:', this.state.Latitude);
      console.log('Longitude:', this.state.longitude);
    });

    //================================================================================================//
    console.log('MY ROUTES: ', this.state.User_id);
    this.SearchRecords();
  }

  async SearchRecords() {
    var User_id = this.state.User_id;
    console.log('Data sending id: ', this.state.User_id);
    if (User_id.length == 0) {
      alert('Required Field Is Missing');
    } else {
      var SearchAPIURL = 'https://skillpundit.com/api/routes.php';

      var header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      var Data = {
        User_id: User_id,
      };

      fetch(SearchAPIURL, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          let polylineMap = [];
          response.reports.map((value, key) => {
            polylineMap.push({
              latitude: value.Latitude,
              longitude: value.Longitude,
            });
          });
          this.setState({
            //data:response.visit
            reports: response.reports,
            polylineMap: polylineMap,
          });
          console.log(response);
          console.log('MY ROUTES:', this.state.reports);
          console.log('POLYLINE MAP:', this.state.polylineMap);
        });
    }
  }

  //---------------------------------------------------------------------------------------------------//

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: this.state.Latitude,
            longitude: this.state.Longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.0121,
          }}>
          {this.state.reports.map(report => (
            <Marker
              key={report.ID}
              coordinate={{
                latitude: report.Latitude,
                longitude: report.Longitude,
              }}
            />
          ))}
          {this.state.polylineMap.length > 0 ? (
            <Polyline
              coordinates={
                this.state.polylineMap.length > 0 ? this.state.polylineMap : []
              }
              strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={['blue']}
              strokeWidth={3}
            />
          ) : null}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
