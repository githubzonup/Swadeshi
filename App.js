//IMPORT ALL SCREENS HERE:
import {Provider} from 'mobx-react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AddVisit from './src/screens/AddVisit';
import Dashboard from './src/screens/Dashboard';
import getcurrentadd from './src/screens/getcurrentadd';
import Getdata from './src/screens/Getdata';
import Login from './src/screens/Login';
import MyAppointments from './src/screens/MyAppointments';
import MyLeads from './src/screens/MyLeads';
import MyProfile from './src/screens/MyProfile';
import MyVisits from './src/screens/MyVisits';
import RouteMap from './src/screens/RouteMap';
import StartDay from './src/screens/StartDay';
import initializeStore from './src/stores/rootStore';
//IMPORT NAVIGATION:
const mobxStore = initializeStore();

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

const App = () => {
  <Provider {...mobxStore}>
    <AppWithRouter />
  </Provider>;
};

export default App;
