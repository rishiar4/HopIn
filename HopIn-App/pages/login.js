import React, { Component, Fragment } from 'react'
import { Text, StyleSheet, View, StatusBar, SafeAreaView, Image } from 'react-native'
import { Button, ThemeProvider } from 'react-native-elements';

import * as Animatable from 'react-native-animatable';



export default class login extends Component {

    state={
        animate:'fadeInUp'
    }

    static navigationOptions = {
        header: null,
        headerLeft : null

    };


    fadeoff = ()=>{
            this.setState({animate:'fadeOutUp'})
            // alert(1);
                setTimeout(()=>{
            this.props.navigation.replace('Map');
        },500)
    }

    render() {
        return (
            <Fragment>
                <StatusBar backgroundColor="#F7F8FB" barStyle="dark-content" />
                <SafeAreaView style={{flex:1,justifyContent:'space-around',backgroundColor:'#F7F8FB'}}>
                <View style={{height:0}}></View>

                    <Animatable.Text  animation={this.state.animate} style={{ textAlign: "center", fontSize: 50, alignItems: 'center',fontFamily:'TrebuchetMS-Bold',fontWeight:"bold",color:'#1B356B',paddingBottom:10,marginTop:-100 }}>
                    <Image
          style={{width: 200, height: 200}}
          source={require('../assets/logo.png')}
        />
                    </Animatable.Text>

                    <Animatable.View delay={200} animation={this.state.animate} style={{ width: "80%", alignItems: 'stretch', alignSelf: 'center' }}>
                        {/* <Button style={styles.button} color="#ff5c5c" title="I'm a button!" /> */}
                        <Button

                            title="Login"
                            buttonStyle={{ backgroundColor: '#1AD992', padding: 20 }}
                            titleStyle={{ fontSize: 20 }}
                            // raised={10}
                            onPress={this.fadeoff}
                        />

                    </Animatable.View>
                    <Animatable.View
                    animation={this.state.animate}
                    style={{position:'absolute',bottom:-25,alignSelf:'center'}}
                    delay={400}>
                    <Image
                    animation="fadeInUp"
                        style={{ width: 460, height: 300,opacity: 0.7,}}
                        source={require('../assets/login1.png')}
                    />
                    </Animatable.View>
                    <View style={{height:200}}></View>

                </SafeAreaView></Fragment>
        )
    }
}

const styles = StyleSheet.create({

})
