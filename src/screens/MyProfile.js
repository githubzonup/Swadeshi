import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
} from 'react-native';
export default class App extends React.Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerShown: false,
  };

  render() {
    return (
      <View>
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
            <Text
              style={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 40,
                // marginTop: "-30%",
                //   marginLeft: "28%",
              }}>
              MY PROFILE
            </Text>
          </ImageBackground>
        </View>
        <ScrollView>
          <View
            style={{
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, paddingLeft: '6%'}}>Name </Text>
          </View>
          <View>
            <TextInput
              style={{
                height: 45,
                width: '70%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '-8.5%',
                //alignContent: 'center',
                //alignItems: 'center',
                marginLeft: '21%',
                paddingLeft: 20,
                //  justifyContent: 'center',
              }}
              //placeholder="ADDRESS / LOCATION"
              placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, paddingLeft: '6%'}}>Email </Text>
          </View>
          <View>
            <TextInput
              style={{
                height: 45,
                width: '70%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '-8.5%',
                //alignContent: 'center',
                //alignItems: 'center',
                marginLeft: '21%',
                paddingLeft: 20,
                //  justifyContent: 'center',
              }}
              //placeholder="ADDRESS / LOCATION"
              placeholderTextColor="black"
            />
          </View>
          <View
            style={{
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, paddingLeft: '6%'}}>Mobile </Text>
          </View>
          <View>
            <TextInput
              style={{
                height: 45,
                width: '70%',
                borderWidth: 2,
                borderRadius: 50,
                borderColor: '#00008B',
                marginTop: '-8.5%',
                //alignContent: 'center',
                //alignItems: 'center',
                marginLeft: '21%',
                paddingLeft: 20,
                //  justifyContent: 'center',
              }}
              //placeholder="ADDRESS / LOCATION"
              placeholderTextColor="black"
            />
          </View>
        </ScrollView>
      </View>
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
