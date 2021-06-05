//IMPORT ALL SCREENS HERE:
import React from 'react';
import {observer, inject} from 'mobx-react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddVisit from '../screens/AddVisit';
import Dashboard from '../screens/Dashboard';
import getcurrentadd from '../screens/getcurrentadd';
import Getdata from '../screens/Getdata';
import Login from '../screens/Login';
import MyAppointments from '../screens/MyAppointments';
import MyLeads from '../screens/MyLeads';
import MyProfile from '../screens/MyProfile';
import MyVisits from '../screens/MyVisits';
import RouteMap from '../screens/RouteMap';
import StartDay from '../screens/StartDay';

const MainNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    Dashboard: {screen: Dashboard},
    StartDay: {screen: StartDay},
    MyVisits: {screen: MyVisits},
    MyLeads: {screen: MyLeads},
    MyAppointments: {screen: MyAppointments},
    AddVisit: {screen: AddVisit},
    Getdata: {screen: Getdata},
    getcurrentadd: {screen: getcurrentadd},
    MyProfile: {screen: MyProfile},
    RouteMap: {screen: RouteMap},
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#fff',
      },

      headerTitleStyle: {
        color: '#fff',
      },
    },
  },
);

const AppWithRouter = createAppContainer(MainNavigator);

class AppContainer extends React.Component {
  componentDidMount() {
    this.props.mobxStore.userStore.syncUserId();
  }

  render() {
    return <AppWithRouter />;
  }
}

export default inject('mobxStore')(observer(AppContainer));
