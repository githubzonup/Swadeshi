import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Circle  } from 'react-native-maps'; 
export default class RouteMap extends React.Component {
  static navigationOptions = {
    title: 'Route Map',
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {

      reports: [],
    };
  }



  componentDidMount() {

    this.apiCall();
  }
    async apiCall() {

      let resp = await fetch('https://skillpundit.com/api/routes.php')
      let respJson = await resp.json()
       console.log(respJson);
       
      // console.warn( respJson)
       this.setState({
       //  data:respJson.visit
         reports: respJson.reports,
        })
        console.log(this.state.reports);
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
         latitudeDelta: 0.030,
         longitudeDelta: 0.0121,  
      }}
     >
    {this.state.reports.map((report) =>
    <Marker key={report.ID} coordinate={{ latitude: report.Latitude, longitude: report.Longitude }}/>

  )}
 

     </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });