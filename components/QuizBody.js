import React, { Component } from 'react'
import Card from './Card'
import { connect } from 'react-redux'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { setScore } from '../action'

 class QuizBody extends Component {
    constructor(props) {
        super(props);
        this.state = {score: 0}; 
    }

    correct = (index, intialScore)=>{
        if(index === 0){
            return 100
        }
        else{
            return (((index*intialScore/100) +1)/(index+1))*100
        }
    }

    wrong = (index, intialScore)=>{
        if(index === 0){
            return 0
        }
        else{
            return (((index*intialScore/100))/(index+1))*100
        }
    }
    render() {
        var {height, width} = Dimensions.get('window');
        const {item, deck, index, size, set, backToFirst} = this.props
        const intialScore =this.props.data[deck]

        return(
                <ScrollView horizontal={false} contentContainerStyle={{  width:width, justifyContent:'flex-start', alignItems:'center'}} >
                    <Text  style={{marginTop: 10, marginBottom:15, fontSize: 22, fontWeight: 'bold', color:'#eee'}}>
                        {deck}
                    </Text>
                    <Text  style={{marginTop: 10, marginBottom:8, fontSize:14, color:'#eee'}}>
                        {index+1} / {size} 
                    </Text>
                   
                    <Card item={item}/>
                    <View style={styles.buttons}>
                    <TouchableOpacity style={[styles.correctionButton, {backgroundColor: '#e55039', marginRight:5}]}  
                        onPress={()=> {const score = this.wrong(index, intialScore);  this.props.set(deck, score);  }}>
                            <Text style={styles.buttonText}>Incorrect</Text>
                        </TouchableOpacity>

                        <TouchableOpacity  style={[styles.correctionButton, {backgroundColor: '#079992', marginLeft:5 }]} 
                        onPress={()=> {
                            const score = this.correct(index, intialScore);  this.props.set(deck, score);  }} >
                            <Text style={styles.buttonText}>Correct</Text>
                        </TouchableOpacity>
                      
                    </View>
                   {((index+1) === size ) && <View>
                       <Text style={{marginTop: 20, color: "#b8e994", fontSize:20, fontWeight:'bold'}}>
                        Score: {Math.trunc(this.props.data[deck])}%
                        </Text>
                        <TouchableOpacity style={[styles.reset]} 
                        onPress={()=> {const score = 0; this.props.set(deck, score); backToFirst();}} >
                            <Text style={{color:'#f6b93b', fontSize:16}}>Reset!</Text>
                        </TouchableOpacity>
                    </View>}
                 </ScrollView>
        )
    }
}
var {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
   
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
        backgroundColor: '#000',
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
      buttons:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      },

      correctionButton:{
        padding: 10,
        borderRadius: 7,
        height: 40,
        marginTop: 10,
        width: width/2 - 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
      reset:{
        padding: 10,
        borderRadius: 7,
        height: 40,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

function mapStateToProps (state, { navigation }) {

    return {
      data: state.score,
    }
  }
  function mapDispatchToProps (dispatch, { navigation }) {
    // const { entryId } = navigation.state.params
    return {
      set: (deck, score) => dispatch(setScore(deck, score)),
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(QuizBody)