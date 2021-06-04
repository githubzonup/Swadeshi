import React, {Component} from 'react';
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
import {DateTimePickerModal} from 'react-native-modal-datetime-picker';
import moment from 'moment';
//import {Picker} from '@react-native-picker/picker';
import {Picker, Item} from 'native-base';

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
      visibility1: false,
      DateDisplay: '',
      TimeDisplay: '',
      Date: '',
      Time: '',
      selected1: 'PRODUCTS INTERSTED:',
      Productsinterested: '',
      selected2: 'ADD TO LEAD:',
      Addtolead: '',
      Appointdate: '',
      Appointtime: '',
      DateDisplay1: '',
      TimeDisplay1: '',
      

      
    };
  }

  selected1(value) {
    this.setState({
      selected1: value,
      Productsinterested: value,
    });
  }
  selected2(value) {
    this.setState({
      selected2: value,
      Addtolead: value
    });
  }
//----------------------------------------------------------------------------------------//
 
 
//--------------------------------------------------------------------------------------//
  handleConfirm = (DateDisplay, TimeDisplay) => {
    this.setState({DateDisplay: moment(DateDisplay).format('YYYY-MM-DD ')});
    this.setState({
      TimeDisplay: moment(TimeDisplay).utcOffset('+05:30').format('hh:mm:ss a'),
    });
  };
  onPressCancel = () => {
    this.setState({visibility: false});
  };
  onPressButton = () => {
    this.setState({visibility: true});
  };
/////-------------------------------------------------------------------------------------------/////

handleConfirm1 = (DateDisplay1, TimeDisplay1) => {
  this.setState({DateDisplay1: moment(DateDisplay1).format('YYYY-MM-DD ')});
  this.setState({
    TimeDisplay1: moment(TimeDisplay1).utcOffset('+05:30').format('hh:mm:ss a'),
  });
};
onPressCancel1 = () => {
  this.setState({visibility1: false});
};
onPressButton1 = () => {
  this.setState({visibility1: true});
};
 
////---------------------------------------------------------------------------------------------/////
  InsertRecord = () => {
    var Customername = this.state.Customername;
    var Address = this.state.Address;
    var Contactnumber = this.state.Contactnumber;
    var Email = this.state.Email;
    var Date = this.state.DateDisplay;
    var Time = this.state.TimeDisplay;
    var Productsinterested = this.state.Productsinterested
    var Addtolead = this.state.Addtolead;
    var Appointdate = this.state.DateDisplay1;
    var Appointtime = this.state.TimeDisplay1

    if (
      Customername.length == 0 ||
      Address.length == 0 ||
      Contactnumber.length == 0 ||
      Email.length == 0 ||
      Date.length == 0 ||
      Time.length == 0 ||
      Productsinterested.length == 0 ||
      Addtolead.length == 0 
    ) {
      alert('Required Field is missing');
    } else {
      var InsertAPIURL = 'https://skillpundit.com/api/addvisit.php';
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application.json',
      };
      var Data = {
        Customername: Customername,
        Address: Address,
        Contactnumber: Contactnumber,
        Email: Email,
        Date: Date,
        Time: Time,
        Productsinterested: Productsinterested,
        Addtolead: Addtolead,
        Appointdate: Appointdate,
        Appointtime: Appointtime
      
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          alert(response[0].Message);
        })
        .catch(error => {
          alert('Error: ' + error);
        });
      this.props.navigation.navigate('Dashboard');
    }
  };

  render() {
    return (
      <ScrollView>
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
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 40,
                // marginTop: "-30%",
                //   marginLeft: "28%",
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
              }}
              placeholder="CUSTOMER NAME"
              placeholderTextColor="black"
              onChangeText={Customername => this.setState({Customername})}
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
              }}
              placeholder="ADDRESS / LOCATION"
              placeholderTextColor="black"
              onChangeText={Address => this.setState({Address})}
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
              }}
              placeholder="E-MAIL ID"
              placeholderTextColor="black"
              keyboardType="email-address"
              onChangeText={Email => this.setState({Email})}
            />
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
                DATE & TIME: {this.state.DateDisplay} {this.state.TimeDisplay}
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
                <Item label="PRODUCTS INTERSTED:" value="0"  />
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
              selectedValue={this.state.selected2}
              onValueChange={this.selected2.bind(this)}
                style={{
                  height: 20,
                  width: '80%',
                  marginLeft: '-11%',
                  fontSize: 5,
                }}>
                <Item label="ADD TO LEAD:" value="0"  />
                <Item label="Yes" value="1" />
                <Item label="No" value="2" />

               
              </Picker>
            </View>
            <TouchableOpacity
              onPress={this.onPressButton1}
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
                ADD APPOINTMENT: {this.state.DateDisplay1} {this.state.TimeDisplay1}
              </Text>

              {/* <Text>{this.state.DateDisplay}</Text> */}
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={this.state.visibility1}
              onConfirm={this.handleConfirm1}
              onCancel={this.onPressCancel1}
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
                marginBottom: '10%'
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
