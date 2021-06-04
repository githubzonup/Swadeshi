import React, {useState, useEffect} from 'react';
import moment from 'moment';
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
const AutoDateTime = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentDateWithMoment, setCurrentDateWithMoment] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    //setCurrentDate(date + '-' + month + '-' + year);
    setCurrentDate(year + '-' + month + '-' + date);
    var dateMoment = moment().utcOffset('+05:30').format('hh:mm:ss a');
    setCurrentDateWithMoment(dateMoment);
  }, []);
  return (
    <SafeAreaView>
      {/*
        <Text style={styles.textStyle}>
          {currentDate}
        </Text> */}
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
          START DAY
        </Text>
      </ImageBackground>
      <TouchableOpacity
        style={{
          height: 50,
          width: '80%',
          borderWidth: 2,
          borderRadius: 50,
          borderColor: '#00008B',
          marginTop: '10%',
          //  alignContent: "center",
          // alignItems: "center",
          marginLeft: '11%',
          paddingLeft: 20,
          justifyContent: 'center',
          // paddingTop: 20
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          Date: {currentDate}
        </Text>
        {/* <Text>{this.state.DateDisplay}</Text> */}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: 50,
          width: '80%',
          borderWidth: 2,
          borderRadius: 50,
          borderColor: '#00008B',
          marginTop: '10%',
          //  alignContent: "center",
          // alignItems: "center",
          marginLeft: '11%',
          paddingLeft: 20,
          justifyContent: 'center',
          // paddingTop: 20
        }}>
        <Text style={{color: 'black', fontWeight: 'bold'}}>
          Time: {currentDateWithMoment}
        </Text>
        {/* <Text>{this.state.DateDisplay}</Text> */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};
class App extends React.Component {
  render() {
    return (
      <View>
        <TouchableOpacity
          style={{
            height: 50,
            width: '80%',
            //   borderWidth: 2,
            borderRadius: 50,
            // borderColor: "#00008B",
            marginTop: 225,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '11%',
            paddingLeft: 20,
            justifyContent: 'center',
            backgroundColor: '#FF1493',
          }}
          onPress={() => {
            this.props.navigation.navigate('Dashboard');
            // navigation.navigate('Dashboard');
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
    );
  }
}
export default AutoDateTime;
