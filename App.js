import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './components/HomeScreen';
import DeckDetailScreen from './components/DeckDetailScreen';
import NewCardScreen from './components/NewCardScreen';
import QuizScreen from './components/QuizScreen';
import NewDeckScreen from './components/NewDeckScreen';
import RootReducer from './reducers';
import middleware from './middleware';

const RootNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  DeckDetail: {
    screen: DeckDetailScreen
  },
  NewCard: {
    screen: NewCardScreen
  },
  Quiz: {
    screen: QuizScreen
  },
  NewDeck: {
    screen: NewDeckScreen
  }
}, { initialRouteName: 'Home' });

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(RootReducer, middleware)}>
        <RootNavigator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} />
      </Provider>
    );
  }
}

export default App;
