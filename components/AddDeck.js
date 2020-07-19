import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { addDeck, setScore }  from '../action'


class AddDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck_name: ''
        };
    }

    handleSubmit = () => {
        if(this.state.deck_name === ''){
            alert("Field is required!")} 
        else{
            this.props.setZeroScore(deck=this.state.deck_name) ;
            this.props.AddDeck(this.state.deck_name)
            .then(()=>{
                        this.props.navigation.replace('DeckHome',{
                            deck:this.state.deck_name
                        })});
                    }
    } 

    static navigationOptions = {
        title: 'Add New Deck',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#4f869b',
        },
        headerBackTitleStyle: {fontSize: 15},
     }
   
    render() {

      const { params } = this.props.navigation.state;
      const addDeck = params ? params.add : null;

      return (
          <View style={{flex:1, backgroundColor: '#60a3bc'}}>
            <View style={styles.container}>

                <Text style={styles.label}>
                    Name the Deck:
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Deck name"
                    onChangeText={(deck_name) => this.setState({deck_name})}
                    editable = {true}
                    maxLength = {40}
                    multiline = {false}
                    placeholderTextColor= '#fcf6e0'
                    underlineColorAndroid='transparent'
                />

                <TouchableOpacity style={styles.button} onPress={() => this.handleSubmit }>
                    <Text style={styles.buttonText}> Create Deck </Text>
                </TouchableOpacity>

            </View>
        </View>
      );
    }
}
const styles = StyleSheet.create({
    container: {
       paddingTop: 23,
       paddingLeft: 20,
       paddingRight: 20,
       backgroundColor: '#60a3bc',
    },
    label:{
        alignSelf: 'flex-start',
        fontSize: 18,
        color: "#fff"
    },
    input: {
       marginTop: 10,
       height: 40,
       borderColor: '#f9df81',
       borderWidth: 2,
       borderRadius: 8,
       paddingLeft: 10,
       color: 'white',
       fontSize:16,
       },
    button:{
        backgroundColor: '#4f869b',
        padding: 10,
        borderRadius: 7,
        height: 35,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText:{
        color: '#fff',
      },

})

function mapDispatchToProps (dispatch, { navigation }) {
    const score = 0
    return {
      AddDeck: (deck) => dispatch(addDeck(deck)),
      setZeroScore: (deck) => dispatch(setScore(deck, score )),
   
    }
  }

export default connect(null, mapDispatchToProps)(AddDeck)