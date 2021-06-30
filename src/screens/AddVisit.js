import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import moment from 'moment';
import {Picker, Item} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {BASE_API_URL} from '../constants';

export default class AddVisitScreen extends React.Component {
  static navigationOptions = {
    title: 'AddVisit',
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      Customername: '',
      Address: '',
      Contactnumber: '',
      Email: '',
      visibility: false,
      DateDisplay: '',
      TimeDisplay: '',
      Date: '',
      Time: '',
      selected1: 'PRODUCTS INTERSTED:',
      reportSelected: 0,
      Productsinterested: '',
      selected2: 'ADD TO LEAD:',
      Addtolead: '',
      Appointdate: '',
      Appointtime: '',
      CurrentDate: '',
      CurrentTime: '',
      lat: '',
      long: '',
      Longitude: '',
      Latitude: '',
      Address: '',
      User_id: this.props.navigation.state.params.id,
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      reportOptions: [],
    };
  }

  fetchReportOptions = async () => {
    const response = await axios.get(`${BASE_API_URL}/api/dropdown.php`);
    if (Array.isArray(response?.data?.reports)) {
      this.setState({reportOptions: response?.data?.reports});
    }
  };

  selected1(value) {
    this.setState({
      selected1: value,
      Productsinterested: value,
    });
  }
  selected2(value) {
    this.setState({
      selected2: value,
      Addtolead: value,
    });
  }
  //----------------------------------------------------------------------------------------//

  //--------------------------------------------------------------------------------------//
  handleConfirm = DateDisplay => {
    this.setState({DateDisplay: moment(DateDisplay).format('YYYY-MM-DD ')});
    this.setState({
      TimeDisplay: moment(DateDisplay).utcOffset('+05:30').format('hh:mm:ss a'),
    });
  };
  onPressCancel = () => {
    this.setState({visibility: false});
  };
  onPressButton = () => {
    this.setState({visibility: true});
  };
  /////-------------------------------------------------------------------------------------------/////

  ////---------------------------------------------------------------------------------------------/////
  InsertRecord = () => {
    var User_id = this.state.User_id;
    var Customername = this.state.Customername;
    var Address = this.state.Address;
    var Contactnumber = this.state.Contactnumber;
    var Email = this.state.Email;
    var Time = this.state.CurrentTime;
    var Date = this.state.CurrentDate;
    var Productsinterested = this.state.Productsinterested;
    var Addtolead = this.state.Addtolead;
    var Appointdate = this.state.DateDisplay;
    var Appointtime = this.state.TimeDisplay;
    var Latitude = this.state.Latitude;
    var Longitude = this.state.Longitude;

    if (
      User_id.length == 0 ||
      //  Customername.length == 0 ||
      Address.length == 0 ||
      // Contactnumber.length == 0 ||
      //  Email.length == 0 ||
      Date.length == 0 ||
      Time.length == 0 ||
      Productsinterested.length == 0 ||
      Addtolead.length == 0
    ) {
      alert('Required Field is missing');
    } else {
      var InsertAPIURL = 'https://skillpundit.com/api/addvisit.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application.json',
      };
      var Data = {
        User_id: User_id,
        Customername: Customername,
        Address: Address,
        Contactnumber: Contactnumber,
        Email: Email,
        Date: Date,
        Time: Time,
        Productsinterested: Productsinterested,
        Addtolead: Addtolead,
        Appointdate: Appointdate,
        Appointtime: Appointtime,
        Latitude: Latitude,
        Longitude: Longitude,
        ReporterId: this.state.reportSelected,
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          alert('Successfully Submitted');
          this.props.navigation.navigate('Dashboard');
        })

        .catch(error => {
          alert('Error: ' + error);
        });
    }
  };
  watchID: ?number = null;
  async componentDidMount() {
    // alert("ADDVISIT: ", this.state.User_id)
    console.log('ADDVISIT:', this.state.User_id);

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
    //======================================================================================//
    Geolocation.getCurrentPosition(position => {
      const initialPosition = JSON.stringify(position);
      this.setState({initialPosition});
      console.log('Start details: ', initialPosition);
    });
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
    //======================================================================================//
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
      Geocoder.from(this.state.lat, this.state.long)
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

    this.fetchReportOptions();
  }

  render() {
    return (
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../../icons/headerbg.png')}
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
                //  borderRadius: 7,
                marginLeft: '87%',
                marginTop: -10,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: '#fff',

                //  borderColor: 'black',
                // borderWidth: 1,
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
              ADD VISIT
            </Text>
          </ImageBackground>
        </View>
        <View>
          <SafeAreaView>
            <TextInput
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '10%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '11%',
                paddingLeft: 20,
                justifyContent: 'center',
                color: 'black',
              }}
              placeholder="CUSTOMER NAME"
              placeholderTextColor="black"
              onChangeText={Customername => this.setState({Customername})}
            />
            <TouchableOpacity
              style={{
                height: 60,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                //  alignContent: "center",
                // alignItems: "center",
                marginLeft: '11%',
                paddingLeft: 20,
                justifyContent: 'center',
                // paddingTop: 20
              }}>
              <Text
                style={{color: 'black'}}
                //onChangeText={Location => this.setState({Location})}
              >
                {/* Location: {this.state.lat}, {this.state.long} */}
                Location: {this.state.Address}
              </Text>
            </TouchableOpacity>
            {/* <TextInput
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '11%',
                paddingLeft: 20,
                justifyContent: 'center',
              }}
              placeholder="ADDRESS / LOCATION"
              placeholderTextColor="black"
              onChangeText={Address => this.setState({Address})}
            /> */}
            <TextInput
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '11%',
                paddingLeft: 20,
                justifyContent: 'center',
                color: 'black',
              }}
              placeholder="CONTACT NUMBER"
              placeholderTextColor="black"
              keyboardType="phone-pad"
              onChangeText={Contactnumber => this.setState({Contactnumber})}
            />
            <TextInput
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '11%',
                paddingLeft: 20,
                justifyContent: 'center',
                color: 'black',
              }}
              placeholder="E-MAIL ID"
              placeholderTextColor="black"
              keyboardType="email-address"
              onChangeText={Email => this.setState({Email})}
            />
            <TouchableOpacity
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                //  alignContent: "center",
                // alignItems: "center",
                marginLeft: '11%',
                paddingLeft: 20,
                justifyContent: 'center',
                // paddingTop: 20
              }}>
              <Text>
                DATE & TIME: {this.state.CurrentDate} {this.state.CurrentTime}
              </Text>
              {/* <Text>{this.state.DateDisplay}</Text> */}
            </TouchableOpacity>
            <View
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '11%',
                paddingLeft: -20,
                justifyContent: 'center',
                fontSize: 5,
              }}>
              <Picker
                selectedValue={this.state.selected1}
                onValueChange={this.selected1.bind(this)}
                style={{
                  height: 20,
                  width: '80%',
                  marginLeft: '-11%',
                  fontSize: 5,
                }}>
                <Item label="PRODUCTS INTERSTED:" value="0" />
                <Item label="React Native" value="React-Native" />
                <Item label="Flutter" value="Flutter" />
                <Item label="Android" value="Android" />
                <Item label="IOS" value="IOS" />
              </Picker>
            </View>
            <View
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '11%',
                paddingLeft: -20,
                justifyContent: 'center',
                fontSize: 5,
              }}>
              <Picker
                selectedValue={this.state.reportSelected}
                onValueChange={event =>
                  this.setState({
                    reportSelected: event,
                  })
                }
                style={{
                  height: 20,
                  width: '80%',
                  marginLeft: '-11%',
                  fontSize: 5,
                }}>
                <Item label="REPORTS:" value="0" />
                {Array.isArray(this?.state?.reportOptions) &&
                  this?.state?.reportOptions?.map((reportOption, index) => (
                    <Item
                      key={index}
                      label={reportOption?.name}
                      value={reportOption?.id}
                    />
                  ))}
              </Picker>
            </View>
            <View
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: '11%',
                paddingLeft: -20,
                justifyContent: 'center',
                fontSize: 5,
              }}>
              <Picker
                selectedValue={this.state.selected2}
                onValueChange={this.selected2.bind(this)}
                style={{
                  height: 20,
                  width: '80%',
                  marginLeft: '-11%',
                  fontSize: 5,
                }}>
                <Item label="ADD TO LEAD:" value="0" />
                <Item label="Yes" value="1" />
                <Item label="No" value="2" />
              </Picker>
            </View>
            <TouchableOpacity
              onPress={this.onPressButton}
              style={{
                height: 50,
                width: '80%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '4%',
                //  alignContent: "center",
                // alignItems: "center",
                marginLeft: '11%',
                paddingLeft: 20,
                justifyContent: 'center',
                // paddingTop: 20
              }}>
              <Text>
                ADD APPOINTMENT: {this.state.DateDisplay}{' '}
                {this.state.TimeDisplay}
              </Text>

              {/* <Text>{this.state.DateDisplay}</Text> */}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={this.state.visibility}
              onConfirm={this.handleConfirm}
              onCancel={this.onPressCancel}
              mode="datetime"
              is24Hour={false}
            />
          </SafeAreaView>
          <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                height: 50,
                width: '50%',
                //   borderWidth: 2,
                borderRadius: 50,
                // borderColor: "#00008B",
                marginTop: 25,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                // marginLeft: '11%',
                //  paddingLeft: 20,
                justifyContent: 'center',
                backgroundColor: '#FF1493',
                marginBottom: '10%',
              }}
              // onPress={() => {
              //   this.props.navigation.navigate('Dashboard');
              // }}
              onPress={this.InsertRecord}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: 30,
                }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
});
