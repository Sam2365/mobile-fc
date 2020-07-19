import React, { Component } from 'react'
import { connect } from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

class DeckEntry extends Component {
  constructor(props){
    super(props)
  }

    static navigationOptions = ({ navigation }) => ({
        title: 'Deck Home',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#4f869b'
        },
        headerTitleStyle: { color: '#f9df81' },
        headerBackTitleStyle: {fontSize: 15,},
        headerLeft: <TouchableOpacity style={{marginLeft: 19}} onPress={() => { navigation.replace('DeckList')}}><Ionicons color = '#f9df81' size={25} name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}/></TouchableOpacity>
    });

    render() {
      const { params } = this.props.navigation.state;
      const deck = params ? params.deck : null;
      const dataDeck= this.props.data[deck];
      const quesArray= dataDeck['questions']

        return (
          <View style={styles.container}>
            <Text style={{marginTop:50, marginBottom:10, fontSize:48, color:"#eee"}}>{deck}</Text>
            <Text style={{marginBottom:20, fontSize:16, color:"#eee"}}>{quesArray.length} card(s)</Text>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'StartQuiz',
                {deck: deck}

              )}>
            <Text style={styles.buttonText}>Give Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate(
                'AddCard',
                {deck: deck}
              )}>
            <Text style={styles.buttonText}>Add Card</Text>
           </TouchableOpacity>
          </View>
        );
    }
}
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#60a3bc',
      alignItems: 'center',
      justifyContent: 'flex-start',
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
      width:width/2,
    },
    buttonText:{
      color: '#eee',
      fontSize: 15,
      
    },
  });

  function mapStateToProps (state) {
    return {
      data: state.cards,
    }
  }
export default connect(mapStateToProps)(DeckEntry)