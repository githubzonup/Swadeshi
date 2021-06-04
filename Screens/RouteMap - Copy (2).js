import React from 'react';
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
      reports: [],
      polylineMap: [],
    };
  }

  componentDidMount() {
    this.apiCall();
  }
  async apiCall() {
    let resp = await fetch('https://skillpundit.com/api/routes.php');
    let respJson = await resp.json();
    console.log(respJson);
    let polylineMap = [];
    respJson.reports.map((value, key) => {
      polylineMap.push({latitude: value.Latitude, longitude: value.Longitude});
    });
    // console.warn( respJson)
    this.setState({
      //  data:respJson.visit
      reports: respJson.reports,
      polylineMap: polylineMap,
    });
    console.log(this.state.polylineMap);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 16.9452127,
            longitude: 82.2406291,
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
