//IMPORT ALL SCREENS HERE:
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddVisit from './Screens/AddVisit';
import Dashboard from './Screens/Dashboard';
import getcurrentadd from './Screens/getcurrentadd';
import Getdata from './Screens/Getdata';
import Login from './Screens/Login';
import MyAppointments from './Screens/MyAppointments';
import MyLeads from './Screens/MyLeads';
import MyProfile from './Screens/MyProfile';
import MyVisits from './Screens/MyVisits';
import RouteMap from './Screens/RouteMap';
import StartDay from './Screens/StartDay';

//IMPORT NAVIGATION:

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
const App = createAppContainer(MainNavigator);
export default App;
