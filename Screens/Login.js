import React from 'react';
import {Card} from 'native-base';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
    headerShown: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      UserEmail: '',
      UserPassword: '',
      Id: '',
    };
  }

  login = () => {
    //this.props.navigation.navigate('Dashboard');
    const {UserEmail} = this.state;
    const {UserPassword} = this.state;
    fetch('https://skillpundit.com/api/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: UserEmail,
        password: UserPassword,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        // If server response message same as Data Matched
        if (responseJson === 'Wrong Details') {
          alert(responseJson);
        } else {
          console.log(responseJson);
          this.setState({
            Id: responseJson,
          });
          console.log('ID: ', this.state.Id);
          this.props.navigation.navigate('Dashboard', {id: this.state.Id});
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.swadeshitxt}>
            Swadeshi
            <Text style={{color: '#fff'}}>Group</Text>
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              color: '#fff',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: '3%',
            }}>
            Welcome back
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 2}}>
          <Image
            source={require('../icons/llogo.png')}
            style={{height: 80, width: 80}}
          />
        </View>
        <Card
          style={{
            width: '85%',
            height: '55%',

            marginLeft: '8%',
            marginBottom: 3,
            marginTop: 20,
          }}>
          <ScrollView>
            <View>
              <Text style={{paddingTop: 20, paddingLeft: 30, fontSize: 16}}>
                Mobile Number :
              </Text>
            </View>
            <View>
              <Text style={{paddingTop: 10, paddingLeft: 30, fontSize: 16}}>
                <Icon name="user" size={25} color="grey" />
              </Text>
              <TextInput
                onChangeText={UserEmail => this.setState({UserEmail})}
                style={styles.textInput}
                placeholder="88455545332"
                placeholderTextColor="black"
                // keyboardType="number-pad"
              />
            </View>
            <View>
              <Text style={{paddingTop: 20, paddingLeft: 30, fontSize: 16}}>
                Password :
              </Text>
            </View>
            <View>
              <Text style={{paddingTop: 10, paddingLeft: 30, fontSize: 16}}>
                <Icon name="unlock-alt" size={25} color="grey" />
              </Text>
              <TextInput
                onChangeText={UserPassword => this.setState({UserPassword})}
                style={styles.textInput}
                secureTextEntry={true}
                placeholder="*********"
                placeholderTextColor="black"
              />
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{
                    marginTop: '8%',
                    marginLeft:
                      Dimensions.get('window').height > 700 ? '60%' : '54%',
                    //marginLeft: "60%",
                    //marginRight: 80,
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              style={{
                width: '70%',
                marginTop: '10%',
                marginLeft: '14%',
                color: 'black',
                marginBottom: 10,
              }}
              onPress={() => {
                this.props.navigation.navigate('Dashboard');
              }}
              >
              <Button
                title="Login"
                color="#FF8C00"

              />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={{
                height: 45,
                width: '75%',
                marginTop: 20,
                backgroundColor: '#FF8C00',
                marginLeft: 45,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'black',
                borderWidth: 0.8,
              }}
              onPress={this.login}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>LOGIN</Text>
            </TouchableOpacity>
          </ScrollView>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555077',
  },
  swadeshitxt: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ff9900',
    textAlign: 'center',
    paddingTop: 55,
  },
  textInput: {
    // alignSelf: "stretch",
    //padding: 10,
    marginLeft: 50,
    borderBottomColor: '#000',
    //margin: 5,
    marginRight: 35,
    borderBottomColor: 'grey', // Add this to specify bottom border color
    borderBottomWidth: 2, // Add this to specify bottom border thickness
    marginTop: -40,
    paddingLeft: 10,
    color: 'black',
  },
});
