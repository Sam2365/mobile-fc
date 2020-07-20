import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { connect } from 'react-redux'
// import {setLocalNotification} from '../notification'
// import logoImg from '../images/logo.png';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Bottom tab navigator
const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DeckList} options={{
          tabBarLabel: 'Decks',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" size={size} color={color} />
          ),
        }}/>
      <Tab.Screen name="New Deck" component={AddDeck} options={{
          tabBarLabel: 'New Deck',
          tabBarIcon: ({ color, size }) => (
            <Feather name="folder-plus" size={size} color={color} />
          ),
        }}/>
    </Tab.Navigator>
  );
}


class Main extends Component {
    constructor (props) {
      super(props)
      this.opacityValue = new Animated.Value(0);
    }
    static navigationOptions = {
      title: 'Home',
      headerTintColor: "#f9df81",
      headerStyle: {
        backgroundColor: '#4f869b'
      }
    }

    opacityAnimation = () => {
      this.opacityValue.setValue(0);
      Animated.timing(
        this.opacityValue,
        {
          toValue: 1,
          duration: 1600,
          easing: Easing.linear
        }
      ).start();
    }
    componentDidMount(){
      this.opacityAnimation()
    }

    render() {
      let opacityInterpolate = this.opacityValue.interpolate({
        inputRange: [0, 0.4 ,1],
        outputRange: [0.8, 0, 1]
      });
      return (
        <Animated.View style={styles.container}>
          {/* <Animated.Image source={logoImg } style={styles.logo}/> */}
          <Animated.Text style={[styles.logoText,{opacity: opacityInterpolate}]}> A way to memorize everything </Animated.Text>
         
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'DeckList'
              )}>
              <Text style={styles.buttonText}>Decks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'CreateDeck',
                {add: this.addDeck}
              )}>
              <Text style={styles.buttonText}>Create deck</Text>
            </TouchableOpacity>
          </View>
          <Tab/>
        </Animated.View>
        
      );
    }
  }
  

  var {height, width} = Dimensions.get('window');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#60a3bc',
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: '#60a3bc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
      backgroundColor: '#4f869b',
      padding: 10,
      borderRadius: 7,
      height: 45,
      marginLeft: 40,
      marginRight: 40,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      width: width/2,
    },
    buttonText:{
      color: '#fff',
    },
    // logo:{
    //   width: 160,
    //   height: 150,
    //   marginBottom: 40, 
    //   marginTop: 60,
    // },
    logoText:{
      textAlign: 'center',
      fontSize: 17,
      color: '#eee',
      textShadowColor: 'white',
    },
  });

  export default connect()(Main)