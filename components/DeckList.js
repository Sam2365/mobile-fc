import React, { Component } from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import AddDeck from './AddDeck'
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// //Bottom tab navigator
// const Tab = createBottomTabNavigator();
// function Tabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Decks" component={DeckList} options={{
//           tabBarLabel: 'Decks',
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="list" size={size} color={color} />
//           ),
//         }}/>
//       <Tab.Screen name="New Deck" component={AddDeck} options={{
//           tabBarLabel: 'New Deck',
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="folder-plus" size={size} color={color} />
//           ),
//         }}/>
//     </Tab.Navigator>
//   );
// }

class DeckList extends Component {
    static navigationOptions = {
        title: 'Deck List',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#4f869b'
        }
    }
    
    // const itemView=({item,props}) => {
    //     const data = props.data[item]
    //     return(
    //     <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate(
    //               'Deck Home',
    //               {deck : item}
    //             )}>
    //         <Text style={[styles.buttonText,{fontSize:19}]}>{item} </Text>
    //         <Text style={[styles.buttonText,{fontSize:14}]}>{data['questions'].length} card(s)</Text>
    //     </TouchableOpacity>
    //     )
    // }

    renderArray = ({item}) => {
        const { params } = this.props.navigation.state;
        const deck = this.props.data[item]
        return (item={item} ,props={props}) =>{
            const data = props.data[item]
            return(
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate(
                      'Deck Home',
                      {deck : item}
                    )}>
                <Text style={[styles.buttonText,{fontSize:19}]}>{item} </Text>
                <Text style={[styles.buttonText,{fontSize:14}]}>{data['questions'].length} card(s)</Text>
            </TouchableOpacity>
            )
        }
    }
    renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
    render() {
        const { params } = this.props.navigation.state;
        const deckList = Object.keys(this.props.data)
       return (
         <View style={styles.container}>
            <View style={styles.subContainer}>
              {(deckList.length) ? <FlatList
                  data={deckList}
                  renderItem={this.renderArray}
              /> :<View style={{backgroundColor: '#60a3bc'}}><Text style={{fontSize:17, color: "white"}}>You have to create a deck first!</Text></View>}
            </View>
          </View>
      );
    }
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#60a3bc',
    },
    subContainer: {
       paddingTop: 23,
       paddingLeft: 20,
       paddingRight: 20,
       
    },

    label:{
        alignSelf: 'flex-start',
        fontSize: 18,
    },
    input: {
       marginTop: 10,
       height: 40,
       borderColor: '#777',
       borderWidth: 2,
       borderRadius: 8,
       paddingLeft: 10,
    },
    button:{
        backgroundColor: '#4f869b',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        color: '#eee',
      },
})

function mapStateToProps (state, { navigation }) {
  
    return {
      data: state.cards,
    }
  }
export default connect(mapStateToProps)(DeckList)