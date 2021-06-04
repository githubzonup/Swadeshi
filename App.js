//IMPORT ALL SCREENS HERE:
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import StartDay from "./Screens/StartDay";
import MyVisits from "./Screens/MyVisits";
import MyLeads from "./Screens/MyLeads";
import MyAppointments from "./Screens/MyAppointments";
import AddVisit from "./Screens/AddVisit";
import Getdata from "./Screens/Getdata";
import getcurrentadd from "./Screens/getcurrentadd";
import MyProfile from "./Screens/MyProfile";
import RouteMap from "./Screens/RouteMap";


//IMPORT NAVIGATION:
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


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
       color: "#fff"
     }
    },
  },
);
const App = createAppContainer(MainNavigator);
export default App;
