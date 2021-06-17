import React, {Component} from 'react';
import {
  FlatList,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class MyVisits extends Component {
  static navigationOptions = {
    title: 'Dashboard',
    headerShown: false,
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      User_id: this.props.navigation.state.params.id,
    };
  }

  // componentDidMount() {
  //  // alert("MY VISITS: ", this.state.User_id)
  //   console.log("MY VISITS: ", this.state.User_id)
  //   this.apiCall();
  // }
  //   async apiCall() {

  //     let resp = await fetch('https://skillpundit.com/api/Searchfinal.php')
  //     let respJson = await resp.json()
  //      console.log(respJson);
  //     // console.warn(respJson)
  //      this.setState({data:respJson.visit})
  //   }
  //-----------------------------------------------------------------------------------------------//
  componentDidMount() {
    console.log('MY VISITS: ', this.state.User_id);
    this.SearchRecords();
  }

  async SearchRecords() {
    var User_id = this.state.User_id;
    console.log('Data sending id: ', this.state.User_id);
    if (User_id.length === 0) {
      alert('Required Field Is Missing');
    } else {
      var SearchAPIURL = 'https://skillpundit.com/api/myvisit.php';

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
          this.setState({
            data: response.visit,
          });
          console.log(response);
          console.log('MYVISIT', this.state.data);
        });
    }
  }

  ///---------------------------------------------------------------------------------------------------///

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
                marginTop: 28,
              }}>
              MY VISITS
            </Text>
          </ImageBackground>
        </View>
        {Array.isArray(this.state.data) && this.state.data.length > 0 && (
          <FlatList
            data={this.state.data}
            renderItem={({item}) => (
              <View
                key={item.ID}
                style={{
                  height: 135,
                  width: '90%',
                  marginLeft: '5%',
                  marginTop: 20,
                  borderRadius: 10,
                  backgroundColor: '#fff',
                  paddingLeft: '4%',
                  borderWidth: 0.5,
                  borderColor: 'grey',
                }}>
                {/* <Text style={{fontWeight: "bold"}}>{item.ID} {item.Customername} {item.Contactnumber} {item.Address} {item.Productsinterested}</Text>  */}
                <Text style={{fontWeight: 'bold', marginTop: '2%'}}>
                  NAME: <Text style={{color: 'blue'}}>{item.Customername}</Text>
                </Text>
                <Text style={{fontWeight: 'bold', marginTop: '1%'}}>
                  CONTACT NUMBER:
                  <Text style={{color: 'blue'}}> {item.Contactnumber}</Text>
                </Text>
                <Text style={{fontWeight: 'bold', marginTop: '1%'}}>
                  ADDRESS: <Text style={{color: 'blue'}}>{item.Address}</Text>
                </Text>
                <Text style={{fontWeight: 'bold', marginTop: '1%'}}>
                  PRODUCTS INTERSTED:
                  <Text style={{color: 'blue'}}>
                    {' '}
                    {item.Productsinterested}
                  </Text>
                </Text>
              </View>
            )}
          />
        )}
        <TouchableOpacity
          style={{
            height: 50,
            width: '90%',
            marginLeft: '5%',
            marginTop: 20,
            borderRadius: 10,
            backgroundColor: '#fff',
            paddingLeft: '4%',
            borderWidth: 0.5,
            borderColor: 'grey',
            marginBottom: 10,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Hyperlink
            linkText={url =>
              url === 'https://skillpundit.com/SwadeshiGroup.xlsx'
                ? '   EXPORT TO EXCEL'
                : url
            }
            linkDefault={true}>
            <TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: '#000080',
                  fontSize: 25,
                }}>
                <Icon name="plus-square" size={25} color="skyblue" />
                https://skillpundit.com/SwadeshiGroup.xlsx
              </Text>
            </TouchableOpacity>
          </Hyperlink>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}
