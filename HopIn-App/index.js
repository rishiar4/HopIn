/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Home from './pages/home'
import map from './pages/map.js';
import login from './pages/login.js';
import payment from './pages/payment.js';
import Main from './pages/main.js';
import support from './pages/support.js';

const MainNavigator = createStackNavigator({
  Login:{screen:login},
  Home: {screen: Home},
  Map:{screen:map},
  payment:{screen:payment},
  Main:{screen:Main},
  support:{screen:support}
});
console.disableYellowBox = true;

const App = createAppContainer(MainNavigator);

AppRegistry.registerComponent(appName, () => App);
