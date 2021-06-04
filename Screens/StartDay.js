import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
class StartDayScreen extends Component {
  static navigationOptions = {
    title: 'Login',
    headerShown: false,
  };


  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      long: '',
      Longitude: '',
      Latitude: '',
      CurrentTime: '',
      Time: '',
      CurrentDate: '',
      Date: '',
      SDaytype: '1',
      EDaytype: '2',
      Dayype: '',
      FAddress: '',
      Address: '',
      User_id: this.props.navigation.state.params.id,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  }

  location=() =>{
    Geolocation.getCurrentPosition(info => {
      console.log('Check Geolocation: ==> ', info);
      this.setState({
        lat: info.coords.latitude,
        long: info.coords.longitude,
        Latitude: info.coords.latitude,
        Longitude: info.coords.longitude,
      
      });

      Geocoder.init('AIzaSyAzvUS8W6b2URIWCK2PSfd7_2ZlO0qlucI');
   //   Geocoder.from(info.coords.latitude, info.coords.longitude)
      Geocoder.from(this.state.lat,this.state.long)
        // Geocoder.from(16.9452127,82.2406291)
        .then(json => {
          var address_component = json.results[0].formatted_address;
          // alert(address_component);
          this.setState({
            Address: address_component,
          });
          //address= json.results[0].formatted_address.
          //  alert((address = address_component));
          // alert("Address:" +addressComponent.long_name)
          console.log('Address: ==>', address_component.long_name);
        })
        .catch(error => console.warn(error));
    });

  }
  watchID: ?number = null;
  async componentDidMount() {
   // this.location();
//-----------------------------------------------------------------------------//

Geolocation.getCurrentPosition(info => {
  console.log('Check Geolocation: ==> ', info);
  this.setState({
    lat: info.coords.latitude,
    long: info.coords.longitude,
    Latitude: info.coords.latitude,
    Longitude: info.coords.longitude,
  
  });

  Geocoder.init('AIzaSyAzvUS8W6b2URIWCK2PSfd7_2ZlO0qlucI');
//   Geocoder.from(info.coords.latitude, info.coords.longitude)
  Geocoder.from(this.state.lat,this.state.long)
    // Geocoder.from(16.9452127,82.2406291)
    .then(json => {
      var address_component = json.results[0].formatted_address;
      // alert(address_component);
      this.setState({
        Address: address_component,
      });
      //address= json.results[0].formatted_address.
      //  alert((address = address_component));
      // alert("Address:" +addressComponent.long_name)
      console.log('Address: ==>', address_component.long_name);
    })
    .catch(error => console.warn(error));
});
//-----------------------------------------------------------------------------//
   // alert("START ID: ", this.state.User_id)
    console.log("StartDay:", this.state.User_id)
//---------------------------------------------------------------//
Geolocation.getCurrentPosition(
  (position) => {
     const initialPosition = JSON.stringify(position);
     this.setState({ initialPosition });
     console.log("Start details: ",initialPosition)
  },
);
this.watchID = Geolocation.watchPosition((position) => {
  const lastPosition = JSON.stringify(position);
  this.setState({ lastPosition });
});
//---------------------------------------------------------------//
    // Geolocation.getCurrentPosition(info => {
    //   console.log('Check Geolocation: ==> ', info);
    //   this.setState({
    //     lat: info.coords.latitude,
    //     long: info.coords.longitude,
    //     Latitude: info.coords.latitude,
    //     Longitude: info.coords.longitude,
    //   });
    //   Geocoder.init('AIzaSyAzvUS8W6b2URIWCK2PSfd7_2ZlO0qlucI');
    //   Geocoder.from(info.coords.latitude, info.coords.longitude)
    //     // Geocoder.from(16.9452127,82.2406291)
    //     .then(json => {
    //       var address_component = json.results[0].formatted_address;
    //       // alert(address_component);
    //       this.setState({
    //         Address: address_component,
    //       });
    //       //address= json.results[0].formatted_address.
    //       //  alert((address = address_component));
    //       // alert("Address:" +addressComponent.long_name)
    //       console.log('Address: ==>', address_component.long_name);
    //     })
    //     .catch(error => console.warn(error));
    // });

    var today = new Date(),
      date =
        today.getFullYear() +
        '-' +
        (today.getMonth() + 1) +
        '-' +
        today.getDate();

    var dateMoment = moment().utcOffset('+05:30').format('hh:mm:ss a');
    this.setState({
      CurrentTime: dateMoment,
      CurrentDate: date,
    });
  }
  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
   }
  //----------------------------------------------------------------//
  StartDay = () => {
    var User_id = this.state.User_id;
    var Latitude = this.state.Latitude;
    var Longitude = this.state.Longitude;
    var Time = this.state.CurrentTime;
    var Date = this.state.CurrentDate;
    var Daytype = this.state.SDaytype;
    var Address = this.state.Address;

    if (
      User_id.length == 0 ||
      Latitude.length == 0 ||
      Longitude.length == 0 ||
      Time.length == 0 ||
      Date.length == 0 ||
      Daytype == 0 ||
      Address == 0
    ) {
      alert('Required Field is missing');
    } else {
      var InsertAPIURL = 'https://skillpundit.com/api/insert.php';
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application.json',
      };
      var Data = {
        User_id: User_id,
        Latitude: Latitude,
        Longitude: Longitude,
        Time: Time,
        Date: Date,
        Daytype: Daytype,
        Address: Address,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          alert('Start Day Updated.');
        })
        .catch(error => {
          alert('Error: ' + error);
        });
      this.props.navigation.navigate('Dashboard');
    }
  };

  EndDay = () => {
    var User_id = this.state.User_id;
    var Latitude = this.state.Latitude;
    var Longitude = this.state.Longitude;
    var Time = this.state.CurrentTime;
    var Date = this.state.CurrentDate;
    var Daytype = this.state.EDaytype;
    var Address = this.state.Address;

    if (
      User_id.length == 0 ||
      Latitude.length == 0 ||
      Longitude.length == 0 ||
      Time.length == 0 ||
      Date.length == 0 ||
      Daytype == 0  ||
      Address == 0
    ) {
      alert('Required Field is missing');
    } else {
      var InsertAPIURL = 'https://skillpundit.com/api/insert.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application.json',
      };
      var Data = {
        User_id: User_id,
        Latitude: Latitude,
        Longitude: Longitude,
        Time: Time,
        Date: Date,
        Daytype: Daytype,
        Address: Address,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          alert('End Day Updated.');
        })
        .catch(error => {
          alert('Error: ' + error);
        });
      this.props.navigation.navigate('Dashboard');
    }
  };

  render() {
    return (
      <View>
        <ImageBackground
          source={require('../icons/headerbg.png')}
          style={{
            height: 202,
            width: '100%',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: 50,
              width: 50,
              marginLeft: '87%',
              marginTop: -10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <MaterialCommunityIcons name="logout" color="#fff" size={38} />
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
              fontSize: 40,
              // marginTop: "-30%",
              //   marginLeft: "28%",
              marginTop: 28,
            }}>
            START DAY
          </Text>
        </ImageBackground>
            <ScrollView>
        <TouchableOpacity
          style={{
            height: 50,
            width: '80%',
            borderWidth: 2,
            borderRadius: 50,
            borderColor: '#00008B',
            marginTop: '5%',
            //  alignContent: "center",
            // alignItems: "center",
            marginLeft: '11%',
            paddingLeft: 20,
            justifyContent: 'center',
            // paddingTop: 20
          }}>
          {/* <MaterialCommunityIcons name="logout" color='#fff' size={35} /> */}
          <Text style={{color: 'black'}}>Date: {this.state.CurrentDate} </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            width: '80%',
            borderWidth: 2,
            borderRadius: 50,
            borderColor: '#00008B',
            marginTop: '8%',
            //  alignContent: "center",
            // alignItems: "center",
            marginLeft: '11%',
            paddingLeft: 20,
            justifyContent: 'center',
            // paddingTop: 20
          }}>
          <Text style={{color: 'black'}}>Time: {this.state.CurrentTime}</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={this.location}
          style={{
            height: 60,
            width: '80%',
            borderWidth: 2,
            borderRadius: 50,
            borderColor: '#00008B',
            marginTop: '8%',
            //  alignContent: "center",
            // alignItems: "center",
            marginLeft: '11%',
            paddingLeft: 20,
            justifyContent: 'center',
            // paddingTop: 20
          }}>
          <Text style={{color: 'black'}}>
            {/* Location: {this.state.lat}, {this.state.long} */}
            Location: {this.state.Address}
          </Text>
        </TouchableOpacity>


        <View>
          <TouchableOpacity
            style={{
              height: 50,
              width: '80%',
              //   borderWidth: 2,
              borderRadius: 50,
              // borderColor: "#00008B",
              marginTop: 25,
              alignContent: 'center',

              marginLeft: '11%',
              paddingLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
              justifyContent: 'center',
              backgroundColor: '#1E90FF',
            }}
            // onPress={() => {
            //   this.props.navigation.navigate('Dashboard');
            // }}
            onPress={this.StartDay}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 30,
              }}>
              START DAY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.EndDay}
            style={{
              height: 50,
              width: '80%',
              //   borderWidth: 2,
              borderRadius: 50,
              // borderColor: "#00008B",
              marginTop: 25,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '11%',
              paddingLeft: 20,
              justifyContent: 'center',
              backgroundColor: '#FF1493',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 30,
              }}>
              END DAY
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  big: {
    fontSize: 25,
  },
});

export default StartDayScreen;
