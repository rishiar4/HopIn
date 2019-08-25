import React, { Component } from 'react'
import { Text, StatusBar, StyleSheet, View, TouchableOpacity,Image } from 'react-native'

import * as Animatable from 'react-native-animatable';


export default class Main extends Component {

  static navigationOptions = {
    header: null
  }

state = {
  toggle:false
}


  render() {
    return (
      <View style={{ flex: 1 }}>

        {this.state.toggle?<Animatable.View animation="fadeInUp" style={{marginTop:200}}>
          <Image
          style={{width: 250, height: 250,alignSelf:'center'}}
          source={require('../assets/Pay.png')}
        />
         <Text style={{fontSize:25,fontWeight:'600',alignSelf:"center",marginTop:20}}>Tap Nearest NFC To Pay</Text>

          </Animatable.View>:  <TouchableOpacity onPress={()=>{this.setState({toggle:true})}} style={{ marginTop:300,padding:10,elevation:5,alignSelf: 'center',backgroundColor:'#4CAF50',color:'white',borderRadius:10}}>
            <Text style={{fontSize:25,color:'white',fontWeight:'700'}}>Pay Via NFC</Text>
          </TouchableOpacity>}

          


      </View>
    )
  }
}

const styles = StyleSheet.create({

})
