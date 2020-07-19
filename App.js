import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation-stack';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AddCard from './components/AddCard';
import AddDeck from './components/AddDeck';
import DeckEntry from './components/DeckEntry';
import DeckList from './components/DeckList';
import Main from './components/Main';
import Quiz from './components/Quiz';

import reducer from './reducer';
import { setLocalNotification } from './helper';


const Stack = createStackNavigator({
  Main: { screen: Main },
  AddDeck: {screen: AddDeck},
  DeckList: {screen: DeckList},
  DeckEntry: {screen: DeckEntry},
  AddCard: {screen: AddCard},
  Quiz: {screen: Quiz}
})

// const App = createAppContainer(Stack);


export default class App extends Component {
  
  App = createAppContainer(Stack)

  async componentDidMount(){
    await setLocalNotification()
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store = {createStore(reducer, applyMiddleware(thunk))}>
        <View style = {{flex: 1}}>
          <MyApp />
        </View>
      </Provider>
    )
  }
}