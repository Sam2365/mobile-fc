import React, { Component } from 'react'
import { connect } from 'react-redux'
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import { addCard } from '../action'


class AddCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            que: '',
            ans: '', 
            height: 0
        };
    }

    static navigationOptions = {
        title: 'Home',
        headerTintColor: "#f9df81",
        headerStyle: {
          backgroundColor: '#4f869b'
        },
        headerBackTitleStyle: {fontSize: 15,},
     }

    updateSize = (height) => {
        this.setState({
          height
        });
    }

    submitDetails = () => {
     if(this.state.que === '' || this.state.ans ===''){
         alert('Fields can not be left blank')
        } else{
            const newCard = {
                question: this.state.que,
                answer: this.state.ans
            }; 
            this.props.AddCard(deck,newCard); this.props.navigation.goBack()
    }}
    

    render() {

        const { height } = this.state
        const { params } = this.props.navigation.state;
        const deck = params ? params.deck : null;
        
        return (

        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <View style={styles.subContainer}>
            <Text style={styles.label}>
            Enter your Question:
            </Text>
            <TextInput
                style={[styles.input,{height: 40}]}
                placeholder="Question"
                onChangeText={(que) => this.setState({que})}
                editable = {true}
                maxLength = {80}
                multiline = {true}
                placeholderTextColor= '#fcf6e0'
                underlineColorAndroid='transparent'
            />

            <Text style={styles.label}>
                Answer to the above Question:
            </Text>
            <TextInput
                style={[styles.input,{height: Math.max(40, this.state.height + 5)}]}
                placeholder="Answer"
                onChangeText={(ans) => this.setState({ans})}
                editable = {true}
                maxLength = {110}
                multiline = {true}
                placeholderTextColor= '#fcf6e0'
                onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
                underlineColorAndroid='transparent'
            />
            <TouchableOpacity style={styles.button} onPress={()=> this.submitDetails()}>
                <Text style={styles.buttonText}>
                    Add Card
                </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      );
    }
}
const styles = StyleSheet.create({
    container: {
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
        marginTop: 5,
        color: "#eee",
    },
    input: {
       marginTop: 10,
       borderColor: '#f9df81',
       borderWidth: 2,
       borderRadius: 8,
       paddingLeft: 10,
       paddingTop: 5,
       marginBottom: 8,
       color: '#eee',
       fontSize: 14,
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
    return {
      AddCard: (deck, card) => dispatch(addCard(deck, card)),
    }
  }

export default connect(null, mapDispatchToProps)(AddCard)