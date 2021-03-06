import {
    AppRegistry,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Provider } from 'react-redux';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { createAppContainer } from 'react-navigation';
import React from 'react';
import Home from './components/Home';
import Pending from './components/Pending';
import Capture from './components/Capture';
import Estimation from './components/Estimation';
import Video from './components/Video';
import Authentication from './components/Authentication';
import GameResult from './components/GameResult';
import Error from './components/Error';
import NavigationDrawer from './components/NavigationDrawer';
import createStore, { sagaMiddleware, rootSaga } from './redux';
import SignUpSuccess from './components/SignUpSuccess';
import EstimationNew from './components/EstimationNew';
import { baseUrlSocket } from './config';
import WS from './helpers/ws';

console.disableYellowBox = true;

WS.init({ baseUrlSocket });

const store = createStore();

const styles = {
  container: {
    backgroundColor: 'rgb(255,245,201)',
  },
};

const AppNavigator = createAnimatedSwitchNavigator({
  Authentication: {
    screen: Authentication,
  },
  SignUpSuccess: {
    screen: SignUpSuccess,
  },
  Home: {
    screen: Home,
  },
  Pending: {
    screen: Pending,
  },
  Capture: {
    screen: Capture,
  },
  Estimation: {
    screen: Estimation,
  },
  Video: {
    screen: Video,
  },
  Error: {
    screen: Error,
  },
  GameResult: {
    screen: GameResult,
  },
}, {
  initialRouteName: 'Authentication',
});

const App = createAppContainer(AppNavigator);

const DanceCliNew = () => {
  return (
    <LinearGradient colors={['#70e1f5', '#ffd194']} style={{ flex: 1 }}>
      {/*<Provider store={store}>*/}
      {/*  <NavigationDrawer>*/}
      {/*    <App />*/}
      {/*  </NavigationDrawer>*/}
      {/*</Provider>*/}
      <EstimationNew />
    </LinearGradient>
  );
};

sagaMiddleware.run(rootSaga);

AppRegistry.registerComponent('DanceCliNew', () => {
  return DanceCliNew;
});

export default DanceCliNew;
