import React from 'react';
import {inject, observer} from 'mobx-react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class App extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      Id: this.props.navigation.state.params.id,
      lat: '',
      long: '',
      Latitude: '',
      Longitude: '',
    };
  }
  //   componentDidMount(){
  //    // alert(this.props.navigation.state.params.ID1)

  // }

  componentDidMount() {
    // alert(this.state.Id)
    console.log('Dashboard:', this.state.Id);
  }

  render() {
    return (
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../../icons/headerbg.png')}
            style={{height: 202, width: '100%'}}>
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                //  borderRadius: 7,
                marginLeft: '87%',
                marginTop: 5,
                alignItems: 'center',
                justifyContent: 'center',
                // backgroundColor: '#fff',

                //  borderColor: 'black',
                // borderWidth: 1,
              }}
              onPress={() => {
                this.props?.mobxStore?.userStore?.logout();
                this.props.navigation.navigate('Login');
              }}>
              <MaterialCommunityIcons name="logout" color="#fff" size={38} />
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '12%',
            marginTop: -100,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',

            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={() => {
            this.props.navigation.navigate('StartDay', {id: this.state.Id});
          }}>
          <Image
            source={require('../../icons/3.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              this.props.navigation.navigate('StartDay', {id: this.state.Id});
            }}>
            START DAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '55%',
            marginTop: -120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',

            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={() => {
            this.props.navigation.navigate('RouteMap', {id: this.state.Id});
          }}>
          <Image
            source={require('../../icons/2.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              this.props.navigation.navigate('RouteMap', {id: this.state.Id});
            }}>
            ROUTE MAP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '12%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',

            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={() => {
            this.props.navigation.navigate('MyVisits', {id: this.state.Id});
          }}>
          <Image
            source={require('../../icons/4.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              this.props.navigation.navigate('MyVisits', {id: this.state.Id});
            }}>
            MY VISITS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '55%',
            marginTop: -120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',

            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={() => {
            this.props.navigation.navigate('AddVisit', {id: this.state.Id});
          }}>
          <Image
            source={require('../../icons/6.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              this.props.navigation.navigate('AddVisit', {id: this.state.Id});
            }}>
            ADD VISIT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '12%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={() => {
            this.props.navigation.navigate('MyLeads', {id: this.state.Id});
          }}>
          <Image
            source={require('../../icons/5.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              this.props.navigation.navigate('MyLeads', {id: this.state.Id});
            }}>
            LEADS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '55%',
            marginTop: -120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',

            borderColor: 'black',
            borderWidth: 1,
          }}
          // onPress={() => {
          //   this.props.navigation.navigate('Getdata');
          // }}
        >
          <Image
            source={require('../../icons/7.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            // onPress={() => {
            //   this.props.navigation.navigate('Getdata');
            // }}
          >
            TO DO LIST
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '12%',
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',

            borderColor: 'black',
            borderWidth: 1,
          }}
          onPress={() => {
            this.props.navigation.navigate('MyAppointments', {
              id: this.state.Id,
            });
          }}>
          <Image
            source={require('../../icons/1.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            onPress={() => {
              this.props.navigation.navigate('MyAppointments', {
                id: this.state.Id,
              });
            }}>
            APPOINTMENTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 120,
            width: 120,
            borderRadius: 7,
            marginLeft: '55%',
            marginTop: -120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',

            borderColor: 'black',
            borderWidth: 1,
          }}
          // onPress={() => {
          //   this.props.navigation.navigate('MyProfile');
          // }}
        >
          <Image
            source={require('../../icons/8.png')}
            style={{height: '80%', width: '90%'}}
          />
          <Text
            style={{fontWeight: 'bold'}}
            // onPress={() => {
            //   this.props.navigation.navigate('MyProfile');
            // }}
          >
            MY PROFILE
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    height: 150,
    width: 150,
    marginTop: 280,
  },
});

export default inject('mobxStore')(observer(App));
