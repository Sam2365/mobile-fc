import React, { Component } from 'react';
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
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Main"
    screenOptions={{
      gestureEnabled: true,
      headerBackTitleVisible: false
    }}>
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="AddDeck" component={AddDeck} />
      <Stack.Screen name="DeckList" component={DeckList} />
      <Stack.Screen name="DeckEntry" component={DeckEntry} />
      <Stack.Screen name="AddCard" component={AddCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
}


export default class App extends Component {

  async componentDidMount(){
    await setLocalNotification()
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store = {createStore(reducer, applyMiddleware(thunk))}>
        <View style = {{flex: 1}}>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
        </View>
      </Provider>
    )
  }
}